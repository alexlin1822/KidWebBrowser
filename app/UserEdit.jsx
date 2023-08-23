import React, { useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import {
  GetCurrentID,
  SetCurrentID,
  LoadData_local,
  SaveData_local,
  GetStorageKey,
  GenerateNewId,
} from "./utility/Common";

export default function UserEdit() {
  const params = useLocalSearchParams();
  const { passItem } = params;
  console.log("UserEdit item: " + passItem);
  let item = JSON.parse(passItem);

  const currentAccountID = GetCurrentID("currentAccountID");
  const focusMemberID = item.key;

  const [title, setTitle] = useState(item.title);
  const [description, setDescription] = useState(item.description);
  const [icon, setIcon] = useState(
    item.key === "0" ? item.icon.toString().replace("0.", "1.") : item.icon
  );
  const [memo, setMemo] = useState(item.memo);
  const [status, setStatus] = useState(item.status);

  // PeopleCard click event
  const handleSubmit = async () => {
    console.log("handleSubmit");

    let newPersionProfile = {
      key: focusMemberID === "0" ? GenerateNewId("member") : focusMemberID,
      title: title,
      description: description,
      icon: icon,
      memo: memo,
      status: status,
    };

    // Clicked submit button
    // Save resource profile to local storage
    let value = await LoadData_local(GetStorageKey(currentAccountID));

    if (value !== "") {
      let tmpMemberProfile = JSON.parse(value);
      console.log("item_AAA", tmpMemberProfile);

      if (focusMemberID === "0") {
        //Add new records
        tmpMemberProfile.memberlist.push(newPersionProfile);
      } else {
        //update existing records
        let keyToUpdate = newPersionProfile.key;

        const updatedData = tmpMemberProfile.memberlist.map((item) => {
          if (item.key === keyToUpdate) {
            console.log("item_HHH", item);
            // Update the desired key's value here
            return {
              ...item,
              //   key:
              title: newPersionProfile.title,
              description: newPersionProfile.description,
              icon: newPersionProfile.icon,
              memo: newPersionProfile.memo,
              status: newPersionProfile.status,
            };
          }
          return item;
        });
        tmpMemberProfile.memberlist = updatedData;
      }

      value = JSON.stringify(tmpMemberProfile);
      console.log("value_HHH", value);
      await SaveData_local(GetStorageKey(currentAccountID), value);
    }

    SetCurrentID("focusMemberID", "");
    router.push({
      pathname: "/UserProfile",
      params: { needLoad: true },
    });
  };

  const handleCancel = () => {
    SetCurrentID("focusMemberID", "");
    router.push({
      pathname: "/UserProfile",
      params: { needLoad: false },
    });
  };

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <View style={styles.rowView}>
          <Text style={styles.text}>Name</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={setTitle}
            value={title}
            placeholder="Plesae type the name here. "
          />
        </View>
        <View style={styles.rowView}>
          <Text style={styles.text}>Description</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={setDescription}
            value={description}
            placeholder="Plesae type the description here. "
          />
        </View>
        <View style={styles.rowView}>
          <Text style={styles.text}>Icon</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={setIcon}
            value={icon}
            placeholder="Plesae type the icon here. "
          />
        </View>
        <View style={styles.rowView}>
          <Text style={styles.text}>Memo</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={setMemo}
            value={memo}
            placeholder="Plesae type the memo here. "
          />
        </View>
        <View style={styles.rowView}>
          <TouchableOpacity
            style={styles.submitButton}
            onPress={() => handleCancel()}
          >
            <Text style={styles.buttonText}> Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.submitButton}
            onPress={() => handleSubmit()}
          >
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginTop: 30,
    margin: 10,
    flex: 1,
  },
  rowView: {
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
    margin: 10,
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
});
