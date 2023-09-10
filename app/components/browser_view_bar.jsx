import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import {
  Feather,
  AntDesign,
  MaterialCommunityIcons,
  FontAwesome5,
} from "@expo/vector-icons";
import { styleSheetCustom } from "../utility/styles";

export default function BrowserViewBar({ resourceList, timeLeft, onClick }) {
  const handleClicked = (type) => {
    onClick(type);
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
    <View style={[styles.rowView, styles.rowView_close]}>
      <TouchableOpacity
        style={(styles.touchableOpacity, { marginHorizontal: 5 })}
        onPress={() => handleClicked("Exit")}
      >
        <MaterialCommunityIcons name="exit-run" size={24} color="black" />
      </TouchableOpacity>

      <TouchableOpacity
        style={(styles.touchableOpacity, { marginLeft: 30 })}
        onPress={() => handleClicked("GoBack")}
      >
        <AntDesign name="leftsquareo" size={32} color="black" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.touchableOpacity}
        onPress={() => handleClicked("GoForward")}
      >
        <AntDesign name="rightsquareo" size={32} color="black" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.touchableOpacity}
        onPress={() => handleClicked("Reload")}
      >
        <Feather name="refresh-ccw" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.touchableOpacity}
        onPress={() => handleClicked("Home")}
      >
        <Feather name="home" size={24} color="black" />
      </TouchableOpacity>
      <Text
        style={
          (styles.text, { marginLeft: 20, fontSize: 22, fontWeight: "bold" })
        }
      >
        {resourceList.title}
      </Text>
      <Feather style={{ marginLeft: 50 }} name="clock" size={24} color="blue" />
      <Text style={styles.text}>{timeLeft} min</Text>
      <TextInput
        style={styles.textInput}
        value={resourceList.memo}
        placeholder="Memo"
      />
      <TouchableOpacity
        style={(styles.touchableOpacity, { marginHorizontal: 10 })}
        onPress={() => handleClicked("Hide")}
      >
        <FontAwesome5 name="eye-slash" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create(styleSheetCustom);
