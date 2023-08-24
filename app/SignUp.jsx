import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { router } from "expo-router";

import {
  CheckUsernameisExist,
  GenerateNewId,
  GetStorageKey,
  LoadData_local,
  SaveData_local,
} from "./utility/Common";

import {
  InitNewAccountList_local,
  AddNewAccount,
} from "./utility/DataStructure";

import { styleSheetCustom } from "./utility/styles"; // <--- import the custom style sheet

export default function Signup() {
  const [text_nickname, setNickName] = useState("");
  const [text_username, setUserName] = useState("");
  const [text_email, setEmail] = useState("");
  const [text_password, setPassword] = useState("");

  /**
   * @description This function is called when the user submits the Sign Up form
   */
  const handleSignup = async (message) => {
    if (message == "Cancel") {
      router.replace("/Login");
      // router.replace("/");
      return;
    }
    // Check if the user has entered all the required fields
    if (
      text_nickname === "" ||
      text_username === "" ||
      text_email === "" ||
      text_password === ""
    ) {
      alert("Please fill in all the fields");
      return;
    }

    // // Check if the user has entered a valid email address
    // if (!text_email.includes("@")) {
    //   alert("Please enter a valid email address");
    //   return;
    // }

    // // Check if the user has entered a valid password
    // if (text_password.length < 6) {
    //   alert("Password must be at least 6 characters long");
    //   return;
    // }

    // For Testing clear the account list
    // await SaveData_local(GetStorageKey(), "");

    // Check if the user has entered a valid username and email address
    let checkValue = await CheckUsernameisExist(text_username, text_email);

    if (checkValue == 0) {
      //add new account
      let value = await LoadData_local(GetStorageKey());

      if (value != "" && value != null) {
        let myAccount = AddNewAccount(
          GenerateNewId("account"),
          text_nickname,
          text_username,
          text_email,
          text_password
        );
        let blocks = JSON.parse(value);
        blocks.push(myAccount);
        value = JSON.stringify(blocks);
      } else {
        value = InitNewAccountList_local(
          GenerateNewId("account"),
          text_nickname,
          text_username,
          text_email,
          text_password
        );
      }

      //Save the account list to local storage
      SaveData_local(GetStorageKey(), value);

      alert("Account created successfully");

      //navigate to login page
      router.replace("/Login");
    } else if (checkValue == 1) {
      alert("Username already exists");
      return;
    } else if (checkValue == 2) {
      alert("Email address already exists");
      return;
    }
  };

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <View style={styles.rowView}>
          <Text>Name</Text>
          <TextInput
            style={styles.textInput}
            value={text_nickname}
            onChangeText={setNickName}
          />
        </View>
        <View style={styles.rowView}>
          <Text>User Name</Text>
          <TextInput
            style={styles.textInput}
            value={text_username}
            onChangeText={setUserName}
          />
        </View>
        <View style={styles.rowView}>
          <Text>Email</Text>
          <TextInput
            style={styles.textInput}
            value={text_email}
            onChangeText={setEmail}
            autoCapitalize="none"
          />
        </View>
        <View style={styles.rowView}>
          <Text>Password</Text>
          <TextInput
            style={styles.textInput}
            value={text_password}
            onChangeText={setPassword}
            secureTextEntry={true}
          />
        </View>

        <View style={styles.rowView}>
          <TouchableOpacity
            style={styles.submitButton}
            onPress={() => handleSignup("Sign Up")}
          >
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.rowView}>
          <TouchableOpacity
            style={styles.submitButton}
            onPress={() => handleSignup("Cancel")}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create(styleSheetCustom);
