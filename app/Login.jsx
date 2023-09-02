import React, { useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { router } from "expo-router";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";

import { SetCurrentID, resetTotalTimeSpend } from "./utility/Common";
import { LoadAccountData } from "./utility/Store";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { styleSheetCustom } from "./utility/styles"; // <--- import the custom style sheet

export default function Login() {
  const [userName, setuserName] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    // Simulating a login check (you should replace this with your actual authentication logic)
    let result = await LoadAccountData(userName, password);
    // console.log(`Login - handleLogin : ${result}`);

    if (result != "{}") {
      let dict_result = JSON.parse(result);
      // console.log(
      //   `Login - handleLogin - dict_result.owner : ${dict_result.owner}`
      // );

      SetCurrentID("currentAccountID", dict_result.owner);
      SetCurrentID("currentNickName", dict_result.nickname);
      SetCurrentID("currentPin", dict_result.pin);

      resetTotalTimeSpend();
      router.push({
        pathname: "/MembersList",
        params: { account_profile: result },
      });
    } else {
      alert("Invalid credentials. Please try again.");
    }
  };

  const handleSignUp = () => {
    router.replace("/SignUp");
  };

  return (
    <SafeAreaProvider style={[styles.container, styles.container_center]}>
      <View style={[styles.rowView, { marginTop: 100 }]}>
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
      <View style={styles.rowView}>
        <Text style={styles.formText}>User Name</Text>
        <TextInput
          style={styles.textInput}
          value={userName}
          onChangeText={setuserName}
          autoCapitalize="none"
        />
      </View>
      <View style={styles.rowView}>
        <Text style={styles.formText}>Password</Text>
        <TextInput
          style={styles.textInput}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />
      </View>

      <View style={styles.rowView}>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => handleLogin()}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.rowView}>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => handleSignUp()}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create(styleSheetCustom);
