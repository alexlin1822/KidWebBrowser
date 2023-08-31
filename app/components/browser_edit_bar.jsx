import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  TextInput,
  Image,
} from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { GenerateNewId, getIcon } from "../utility/Common";
import { styleSheetCustom } from "../utility/styles";

export default function BrowserEditBar({
  resourceList,
  onEditBarSubmit,
  updateURL,
  updateTitle,
}) {
  // console.log("BrowserEditBar - resourceList : ", resourceList);

  const [defaultUrl, setDefaultUrl] = useState(resourceList.default_url);
  const [webTitle, setWebTitle] = useState(
    resourceList.rid === "0" ? "Google" : resourceList.title
  );

  const [description, setDescription] = useState(
    resourceList.rid === "0" ? "" : resourceList.description
  );

  const [memo, setMemo] = useState(resourceList.memo);
  const [resourceStatus, setResourceStatus] = useState(resourceList.status);

  const [urlInclude, setUrlInclude] = useState(resourceList.url_include);
  const [titleInclude, setTitleInclude] = useState(resourceList.title_include);
  const [whiteList, setWhiteList] = useState(resourceList.whitelist);

  const [useUrlInclude, setUseUrlInclude] = useState(
    resourceList.use_url_include
  );
  const [userTitleInclude, setUseTitleInclude] = useState(
    resourceList.use_title_include
  );
  const [useWhiteList, setUseWhiteList] = useState(resourceList.use_whitelist);

  const [timeLimit, setTimeLimit] = useState(resourceList.time_limit);

  const [iconUrl, setIconUrl] = useState(resourceList.icon);

  const handleSetValue = (type) => {
    if (type === "url_include") {
      let tmp = urlInclude;
      if (tmp.length > 0) {
        tmp += ",";
      }
      tmp += updateURL;
      tmp = clearupURL(tmp);
      setUrlInclude(tmp);
    } else if (type === "title_include") {
      let tmp = titleInclude;
      if (tmp.length > 0) {
        tmp += ",";
      }
      tmp += updateTitle;
      setTitleInclude(tmp);
    } else if (type === "whitelist") {
      let tmp = whiteList;
      if (tmp.length > 0) {
        tmp += ",";
      }
      tmp += updateURL;
      tmp = clearupURL(tmp);
      setWhiteList(tmp);
    }
  };

  const clearupURL = (input) => {
    let tmp = input;
    tmp = tmp.replace("https://", "");
    tmp = tmp.replace("http://", "");
    if (tmp.endsWith("/")) {
      tmp = tmp.slice(0, -1);
    }
    return tmp;
  };

  //* Save Setting function
  const handleSubmit = () => {
    console.log("browser_edit_bar handleSubmit: resourceList - ");
    console.log(resourceList);

    let newResourceList = {
      rid:
        resourceList.rid === "0" ? GenerateNewId("resource") : resourceList.rid,
      title: webTitle,
      description: description,
      default_url: defaultUrl,
      icon: defaultUrl,
      memo: memo,
      status: resourceStatus,
      url_include: urlInclude,
      title_include: titleInclude,
      whitelist: whiteList,
      use_url_include: useUrlInclude,
      use_title_include: userTitleInclude,
      use_whitelist: useWhiteList,
      last_url: defaultUrl,
      time_limit: timeLimit,
    };
    console.log("browser_edit_bar handleSubmit: NewResourceList - ");
    console.log(newResourceList);

    onEditBarSubmit(newResourceList);
  };

  const handleCancel = () => {
    onEditBarSubmit(null);
  };

  const handleSetDefalut = () => {
    setDefaultUrl(updateURL);
    setWebTitle(updateTitle);
    console.log(getIcon(updateURL));
  };

  const handleSetIcon = () => {
    setIconUrl(defaultUrl);
  };

  return (
    <View style={{ backgroundColor: "#d1e3fa", paddingVertical: 2 }}>
      <View style={[styles.rowView, styles.rowView_close]}>
        <TouchableOpacity
          style={{ alignItems: "center" }}
          onPress={handleSetDefalut}
        >
          <Feather name="home" size={32} color="green" />
          <Text style={styles.text}>Set Default</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.textInput}
          onChangeText={setDefaultUrl}
          value={defaultUrl}
          placeholder="Please type or click the button to import the URL here"
        />
        <Text style={styles.text}> Title</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={setWebTitle}
          value={webTitle}
          placeholder="Please type or click the button to import the URL here"
        />
      </View>
      <View style={[styles.rowView, styles.rowView_close]}>
        <TouchableOpacity
          style={{ alignItems: "center" }}
          onPress={handleSetIcon}
        >
          <Image source={{ uri: getIcon(iconUrl) }} style={styles.icon_image} />
        </TouchableOpacity>
        <TextInput
          style={[styles.textInput, { flex: 0.5 }]}
          onChangeText={setIconUrl}
          value={iconUrl}
          placeholder="Please click the button to import the URL or type icon link here"
        />
        <Text style={styles.text}> Description </Text>
        <TextInput
          style={[styles.textInput, { flex: 0.5 }]}
          onChangeText={setDescription}
          value={description}
          placeholder="Please type description here"
        />
      </View>
      <View style={[styles.rowView, styles.rowView_close]}>
        <Text style={(styles.text, { marginHorizontal: 14 })}> Memo</Text>
        <TextInput
          style={[styles.textInput, { flex: 0.95 }]}
          onChangeText={setMemo}
          value={memo}
          placeholder="Please type memo here"
        />
        <Text style={styles.text}> Time Limit</Text>
        <TextInput
          style={[styles.textInput, { flex: 0.05 }]}
          onChangeText={setTimeLimit}
          value={timeLimit}
          placeholder=""
        />
        <Text style={[styles.text, { marginLeft: 0 }]}>min</Text>
      </View>

      <View style={[styles.rowView, styles.rowView_close]}>
        <TouchableOpacity
          style={[
            styles.optionButton,
            useUrlInclude && styles.optionButtonSelected,
          ]}
          onPress={() => setUseUrlInclude(!useUrlInclude)}
        >
          <Text style={styles.optionText}>URL Include</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.textInput}
          onChangeText={setUrlInclude}
          value={urlInclude}
          placeholder="URL include content."
        />
        <TouchableOpacity
          style={{ alignItems: "center" }}
          onPress={() => handleSetValue("url_include")}
        >
          <MaterialCommunityIcons
            name="target-variant"
            size={32}
            color="green"
          />
        </TouchableOpacity>
      </View>

      <View style={[styles.rowView, styles.rowView_close]}>
        <TouchableOpacity
          style={[
            styles.optionButton,
            userTitleInclude && styles.optionButtonSelected,
          ]}
          onPress={() => setUseTitleInclude(!userTitleInclude)}
        >
          <Text style={styles.optionText}>Title Include</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.textInput}
          onChangeText={setTitleInclude}
          value={titleInclude}
          placeholder="Title include content."
        />
        <TouchableOpacity
          style={{ alignItems: "center" }}
          onPress={() => handleSetValue("title_include")}
        >
          <MaterialCommunityIcons
            name="target-variant"
            size={32}
            color="green"
          />
        </TouchableOpacity>
      </View>

      <View style={[styles.rowView, styles.rowView_close]}>
        <TouchableOpacity
          style={[
            styles.optionButton,
            useWhiteList && styles.optionButtonSelected,
          ]}
          onPress={() => setUseWhiteList(!useWhiteList)}
        >
          <Text style={styles.optionText}>Whitelist</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.textInput}
          onChangeText={setWhiteList}
          value={whiteList}
          placeholder='Please type the whitelist here, use "," to spearte.'
        />
        <TouchableOpacity
          style={{ alignItems: "center" }}
          onPress={() => handleSetValue("whitelist")}
        >
          <MaterialCommunityIcons
            name="target-variant"
            size={32}
            color="green"
          />
        </TouchableOpacity>
      </View>
      <View style={[styles.rowView, styles.rowView_close]}>
        <TouchableOpacity
          style={[styles.submitButton, styles.submitButton_two]}
          onPress={handleCancel}
        >
          <Text style={styles.buttonText}> Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.submitButton, styles.submitButton_two]}
          onPress={handleSubmit}
        >
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create(styleSheetCustom);
