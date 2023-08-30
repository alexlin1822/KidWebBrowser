import React, { useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import { AntDesign } from "@expo/vector-icons";

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import {
  GetCurrentID,
  SetCurrentID,
  GetStorageKey,
  GenerateNewId,
} from "./utility/Common";
import { styleSheetCustom } from "./utility/styles";
import {
  SaveNewData,
  SaveUpdateData,
  LoadData,
  deleteData,
} from "./utility/Store";

export default function UserEdit() {
  const params = useLocalSearchParams();
  const { passItem } = params;

  console.log("UserEdit item: " + passItem);
  let item = JSON.parse(passItem);

  const currentAccountID = GetCurrentID("currentAccountID");
  const focusMemberID = item.key;

  const [title, setTitle] = useState(focusMemberID === "0" ? "" : item.title);
  const [description, setDescription] = useState(
    focusMemberID === "0" ? "" : item.description
  );
  const [icon, setIcon] = useState(
    item.key === "0" ? item.icon.toString().replace("0.", "1.") : item.icon
  );
  const [memo, setMemo] = useState(focusMemberID === "0" ? "" : item.memo);
  const [status, setStatus] = useState(item.status);

  //Go back to UserEdit Page
  const jumpToUserEdit = async () => {
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
    if (title === "") {
      alert("Please fill in the name");
      return;
    }

    let newPersionProfile = {
      key: focusMemberID === "0" ? GenerateNewId("member") : focusMemberID,
      title: title,
      description: description,
      icon: icon,
      memo: memo,
      status: status,
    };

    if (focusMemberID === "0") {
      await SaveNewData(
        "members",
        GetStorageKey(currentAccountID),
        JSON.stringify(newPersionProfile)
      );
    } else {
      await SaveUpdateData(
        "members",
        GetStorageKey(currentAccountID),
        JSON.stringify(newPersionProfile)
      );
    }
    await jumpToUserEdit();
  };

  const handleDelete = async () => {
    Alert.alert(
      "Delete This Member",
      "Deleted member can not recover! Are you sure?",
      [
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: async () => {
            // Handle the "Yes" button press here
            if (focusMemberID != "0") {
              await deleteData("members", focusMemberID);
            }
          },
        },
      ],
      { cancelable: false }
    );

    await jumpToUserEdit();
  };

  const handleCancel = async () => {
    await jumpToUserEdit();
  };

  const handImageChange = (which) => {
    console.log("UserEdit - handleSubmit " + which);
    const parts = icon.split("/");
    const oldPngName = parts[parts.length - 1];
    let imageNumber = parseInt(oldPngName.split(".")[0]);

    if (which === "Left") {
      if (imageNumber <= 1) {
        imageNumber = 10;
      } else {
        imageNumber--;
      }
      console.log("UserEdit - handleSubmit Left");
    } else if (which === "Right") {
      if (imageNumber >= 10) {
        imageNumber = 1;
      } else {
        imageNumber++;
      }
      console.log("UserEdit - handleSubmit Right");
    }

    let newPngName = imageNumber.toString() + ".png";
    let newUrl = icon.replace(oldPngName, newPngName);
    setIcon(newUrl);
  };

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <View style={styles.rowView}>
          <TouchableOpacity
            style={[
              styles.submitButton,
              { flex: 0.1, height: 64, marginHorizontal: 50 },
            ]}
            onPress={() => handImageChange("Left")}
          >
            <AntDesign name="caretleft" size={36} color="black" />
          </TouchableOpacity>
          <Image source={{ uri: icon }} style={styles.people_image} />
          <TouchableOpacity
            style={[
              styles.submitButton,
              { flex: 0.1, height: 64, marginHorizontal: 50 },
            ]}
            onPress={() => handImageChange("Right")}
          >
            <AntDesign name="caretright" size={36} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.rowView}>
          <Text style={[styles.text, { width: 75 }]}>Name</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={setTitle}
            value={title}
            placeholder="Plesae type the name here. "
          />
        </View>
        <View style={styles.rowView}>
          <Text style={[styles.text, { width: 75 }]}>Description</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={setDescription}
            value={description}
            placeholder="Plesae type the description here. "
          />
        </View>
        <View style={styles.rowView}>
          <Text style={[styles.text, { width: 75 }]}>Memo</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={setMemo}
            value={memo}
            placeholder="Plesae type the memo here. "
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
            style={[styles.submitButton, { marginHorizontal: 50 }]}
            onPress={() => handleDelete()}
          >
            <Text style={styles.buttonText}> Delete This Member</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create(styleSheetCustom);
