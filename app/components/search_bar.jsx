import React, { useState } from "react";
import { Feather, AntDesign } from "@expo/vector-icons";

import {
  StyleSheet,
  View,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";

export default function SearchBar({
  onSubmit,
  updateURL,
  onGoBack,
  onGoForward,
  onReload,
}) {
  console.log("SearchBar updateURL: " + updateURL);
  const [text, setText] = useState(updateURL);
  const [curURL, setCurURL] = useState(updateURL);

  if (updateURL != curURL) {
    setText(updateURL);
    setCurURL(updateURL);
  }

  //* handleSearch function
  const handleSearch = () => {
    let tmp = addHttps(text);
    setText(tmp);
    setCurURL(tmp);
    onSubmit(tmp);
  };

  const handleGoBack = () => {
    onGoBack();
  };
  const handleGoForward = () => {
    onGoForward();
  };

  const handleReload = () => {
    onReload();
  };

  function addHttps(input) {
    const startsWithHttp = input.startsWith("http://");
    const startsWithHttps = input.startsWith("https://");

    if (input.trim() == "about:blank" || input.trim() == "") {
      return updateURL;
    } else if (!startsWithHttp && !startsWithHttps) {
      return "https://" + input;
    } else {
      return input;
    }
  }

  return (
    <View style={styles.rowView}>
      <TouchableOpacity
        style={styles.touchableOpacity}
        onPress={() => handleGoBack()}
      >
        <AntDesign name="leftsquareo" size={32} color="black" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.touchableOpacity}
        onPress={() => handleGoForward()}
      >
        <AntDesign name="rightsquareo" size={32} color="black" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.touchableOpacity}
        onPress={() => handleReload()}
      >
        <Feather name="refresh-ccw" size={24} color="black" />
      </TouchableOpacity>
      <TextInput
        style={styles.textInput}
        onChangeText={setText}
        value={text}
        placeholder="Please type the URL here"
      />
      <Button title="Search" onPress={handleSearch} />
    </View>
  );
}

const styles = StyleSheet.create({
  rowView: {
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    marginHorizontal: 5,
    height: 36,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
  },
  touchableOpacity: {
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 2,
    marginVertical: 5,
  },
});
