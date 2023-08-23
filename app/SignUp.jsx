import { useState } from "react";
import { StyleSheet, Text, TextInput, View, Button } from "react-native";
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
        <Text>Name</Text>
        <TextInput value={text_nickname} onChangeText={setNickName} />

        <Text>User Name</Text>
        <TextInput value={text_username} onChangeText={setUserName} />

        <Text>Email</Text>
        <TextInput
          value={text_email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />

        <Text>Password</Text>
        <TextInput
          value={text_password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />

        <Button
          style={styles.submitButton}
          title="Sign Up"
          onPress={() => handleSignup("Sign Up")}
        />
        <Button
          style={styles.submitButton}
          title="Cancel"
          onPress={() => handleSignup("Cancel")}
        />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
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
});
