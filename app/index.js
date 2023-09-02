import React, { useState } from "react";
import { Switch, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { router } from "expo-router";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { getIsRemote, setIsRemote } from "./utility/Common";

/**
 * Entry point for the app
 * @returns
 *
 */
export default function Page() {
  const [remoteMode, setRemoteMode] = useState(getIsRemote());

  const handleStart = () => {
    setIsRemote(remoteMode);
    router.replace("/Login");
  };

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <View style={styles.rowView}>
          <TouchableOpacity
            style={styles.touchableOpacity}
            onPress={() => handleStart()}
          >
            <Text style={styles.title_text}>Kid Web Browser</Text>
            <View style={styles.rowView}>
              <MaterialIcons
                style={styles.icon}
                name="face"
                size={48}
                color="lightblue"
              />
              <MaterialCommunityIcons
                style={styles.icon}
                name="face-woman"
                size={48}
                color="pink"
              />

              <MaterialCommunityIcons
                style={styles.icon}
                name="baby-face-outline"
                size={48}
                color="lightblue"
              />
              <MaterialCommunityIcons
                style={styles.icon}
                name="face-agent"
                size={48}
                color="pink"
              />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.rowView}>
          <TouchableOpacity
            style={styles.submitButton}
            onPress={() => handleStart()}
          >
            <Text style={styles.buttonText}>Start Here</Text>
          </TouchableOpacity>
        </View>
        {/* <View style={styles.rowView}>
          <Text style={styles.text}>Local</Text>
          <Switch
            style={{ marginTop: 50 }}
            onValueChange={setRemoteMode}
            value={remoteMode}
          />
          <Text style={styles.text}>Remote</Text>
        </View> */}
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
  rowView: {
    flexDirection: "row",
    alignItems: "center",
    padding: 2,
    marginVertical: 10,
    marginHorizontal: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  submitButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
    paddingHorizontal: 10,
    backgroundColor: "orange",
    borderRadius: 5,
    height: 150,
    marginTop: 20,
    marginBottom: 50,
  },
  buttonText: {
    padding: 10,
    fontSize: 40,
    fontWeight: "bold",
    color: "white",
  },
  title_text: {
    fontSize: 64,
    margin: 20,
    fontWeight: "bold",
    color: "orange",
  },
  text: {
    fontSize: 30,
    marginHorizontal: 10,
    marginTop: 50,
    fontWeight: "bold",
    color: "orange",
  },
  touchableOpacity: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    height: 150,
    marginTop: 20,
    marginBottom: 50,
  },
  icon: {
    margin: 10,
  },
});
