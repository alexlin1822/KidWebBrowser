import React, { useState, useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { router } from "expo-router";
import { GetCurrentID, SetCurrentID, GetStorageKey } from "./utility/Common";
import { styleSheetCustom } from "./utility/styles";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";

import {
  SaveUpdateData,
  LoadData,
  deleteData,
  CheckAccountUnique,
} from "./utility/Store";

export default function Setting() {
  const currentAccountID = GetCurrentID("currentAccountID");

  const [isLoading, setIsLoading] = useState(true);
  const [accountID, setAccountID] = useState("");
  const [nickname, setNickName] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pin, setPin] = useState("");
  const [status, setStatus] = useState("");

  const [oldPassword, setOldPassword] = useState("");
  const [oldPin, setOldPin] = useState("");

  //Go back to Setting Page
  const jumpToMembers = async () => {
    SetCurrentID("focusMemberID", "");

    let str_member = await LoadData(
      "accounts",
      GetStorageKey(currentAccountID)
    );
    router.push({
      pathname: "/MembersList",
      params: { account_profile: str_member },
    });
  };

  // PeopleCard click event
  const handleSubmit = async () => {
    if (nickname === "" || username === "" || email === "") {
      alert("Please fill in all the fields");
      return;
    }

    // Check if the user has entered a valid email address
    if (!email.includes("@")) {
      alert("Please enter a valid email address");
      return;
    }

    // Check if the user has entered a valid password
    if (password.length > 0 && password.length < 6) {
      alert("Password must be at least 6 characters long");
      return;
    }

    //check unique
    let checkResult = await CheckAccountUnique(
      currentAccountID,
      username,
      email
    );

    console.log("Setting - handleSubmit - checkResult: " + checkResult);
    if (checkResult === "") {
      let newAccount = {
        accountID: accountID,
        nickname: nickname,
        username: username,
        email: email,
        password: password === "" ? oldPassword : password,
        pin: pin === "" ? oldPin : pin,
        status: status,
      };

      SetCurrentID("currentNickName", newAccount.nickname);
      SetCurrentID("currentPin", newAccount.pin);

      await SaveUpdateData(
        "accounts",
        GetStorageKey(),
        JSON.stringify(newAccount)
      );

      await jumpToMembers();
    } else {
      alert(checkResult);
      return;
    }
  };

  const handleDelete = async () => {
    await Alert.alert(
      "Delete This Account",
      "Deleted account can not recover! Are you sure?",
      [
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: async () => {
            // Handle the "Yes" button press here
            if (currentAccountID != "") {
              try {
                console.log("Setting - handleDelete - deleteData - start1");
                await deleteData("accounts", GetStorageKey(), currentAccountID);
                await deleteData(
                  "account_profile",
                  GetStorageKey(currentAccountID),
                  ""
                );
                alert("Account has been deleted!");

                SetCurrentID("currentAccountID", "");
                SetCurrentID("currentNickName", "");
                SetCurrentID("currentPin", "");
                router.replace("/Login");
                return;
              } catch (e) {
                console.log(
                  "Setting - handleDelete - deleteData - transactions - error: " +
                    e
                );
              }
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  const handleCancel = async () => {
    await jumpToMembers();
  };

  useEffect(() => {
    async function fetchData() {
      // For test clear this account profile
      // await SaveNewData("member_profile", GetStorageKey(currentAccountID, focusMemberID), "");

      try {
        // Pre-load
        let str_db_data = await LoadData("all", GetStorageKey());
        let dict_db_data = JSON.parse(str_db_data);
        const dict_account = dict_db_data.filter(
          (item) => item.accountID == currentAccountID
        );
        console.log("Setting - dict_account: ");
        console.log(dict_account);

        setAccountID(dict_account[0].accountID);
        setNickName(dict_account[0].nickname);
        setUserName(dict_account[0].username);
        setEmail(dict_account[0].email);
        setOldPassword(dict_account[0].password);
        setOldPin(dict_account[0].pin);
        setStatus(dict_account[0].status);
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <SafeAreaProvider>
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaProvider>
    );
  } else {
    return (
      <SafeAreaProvider style={[styles.container, styles.container_center]}>
        <View style={styles.rowView}>
          <Text style={styles.formText}>Name</Text>
          <TextInput
            style={styles.textInput}
            value={nickname}
            onChangeText={setNickName}
          />
        </View>
        <View style={styles.rowView}>
          <Text style={styles.formText}>User Name</Text>
          <TextInput
            style={styles.textInput}
            value={username}
            onChangeText={setUserName}
          />
        </View>
        <View style={styles.rowView}>
          <Text style={styles.formText}>Email</Text>
          <TextInput
            style={styles.textInput}
            value={email}
            onChangeText={setEmail}
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
          <Text style={styles.formText}>Pin key</Text>
          <TextInput
            style={styles.textInput}
            value={pin}
            onChangeText={setPin}
            secureTextEntry={true}
          />
        </View>
        <View style={styles.rowView}>
          <TouchableOpacity
            style={[styles.submitButton, { marginHorizontal: 50 }]}
            onPress={() => handleCancel()}
          >
            <Text style={styles.buttonText}> Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.submitButton, { marginHorizontal: 50 }]}
            onPress={() => handleSubmit()}
          >
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.rowView, { position: "absolute", bottom: 10 }]}>
          <TouchableOpacity
            style={[styles.deleteButton, { flex: 1 }]}
            onPress={() => handleDelete()}
          >
            <Text style={styles.buttonText}> Delete This Account</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaProvider>
    );
  }
}

const styles = StyleSheet.create(styleSheetCustom);
