import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  TextInput,
} from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { GenerateNewId } from "../utility/Common";

export default function BrowserEditBar({
  resourceList,
  onSubmit,
  updateURL,
  updateTitle,
}) {
  console.log("BrowserEditBar", resourceList);

  // rid: "0",              no
  // title: "Add resource",
  // description: "Add resource",
  // default_url: "https://www.google.com/",
  // icon: "https://www.google.com/favicon.ico",   no
  // memo: "",
  // status: "0",
  // url_include: "",
  // title_include: "",
  // whitelist: "",
  // use_url_include: true,
  // use_title_include: false,
  // use_whitelist: false,
  // last_url: "https://www.google.com/",          no
  // time_limit: "30",

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

  const [iconUrl, setIconUrl] = useState("");

  const handleSetValue = (type) => {
    console.log("handleSetValue", type);
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
    console.log("handleSubmit" + resourceList);
    console.log(resourceList);

    let newResourceList = {
      rid:
        resourceList.rid === "0" ? GenerateNewId("resource") : resourceList.rid,
      title: webTitle,
      description: description,
      default_url: defaultUrl,
      icon: getIcon(defaultUrl),
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
    console.log("NewSubmit" + newResourceList);
    console.log(newResourceList);

    onSubmit(newResourceList);
  };

  const getIcon = (url) => {
    let icon = url + "favicon.ico";
    // await getFavicons(url);
    return icon;
  };

  const handleCancel = () => {
    onSubmit(null);
  };

  const handleSetDefalut = () => {
    setDefaultUrl(updateURL);
    setWebTitle(updateTitle);
    console.log(getIcon(updateURL));
  };

  return (
    <View style={{ backgroundColor: "#d4e3fa", paddingVertical: 2 }}>
      <View style={styles.rowView}>
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
      <View style={styles.rowView}>
        <Text style={styles.text}> Description </Text>
        <TextInput
          style={[styles.textInput, { flex: 0.45 }]}
          onChangeText={setDescription}
          value={description}
          placeholder="Please type description here"
        />
        <Text style={styles.text}> Memo</Text>
        <TextInput
          style={[styles.textInput, { flex: 0.5 }]}
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

      <View style={styles.rowView}>
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

      <View style={styles.rowView}>
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

      <View style={styles.rowView}>
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
      <View style={styles.rowView}>
        <TouchableOpacity style={styles.submitButton} onPress={handleCancel}>
          <Text style={styles.buttonText}> Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rowView: {
    flexDirection: "row",
    alignItems: "center",
    padding: 2,
  },
  submitButton: {
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 100,
    paddingHorizontal: 10,
    backgroundColor: "blue",
    borderRadius: 5,
    height: 50,
    flex: 0.5,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  text: {
    fontSize: 12,
    fontWeight: "bold",
    marginLeft: 10,
  },
  optionButton: {
    alignItems: "center",
    justifyContent: "center",
    width: 120,
    backgroundColor: "grey",
    padding: 10,
    marginHorizontal: 5,
    marginVertical: 2,
    borderRadius: 5,
  },
  optionButtonSelected: {
    backgroundColor: "green",
  },
  optionText: {
    color: "white",
    fontSize: 16,
  },
  selectedOptionsText: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: "bold",
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    marginLeft: 2,
    paddingLeft: 10,
    height: 36,
    borderColor: "gray",
    borderWidth: 1,
  },
  rowView: {
    flexDirection: "row",
    alignItems: "center",
    padding: 2,
  },
});
