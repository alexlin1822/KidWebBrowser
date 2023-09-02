import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import Modal from "react-native-modal";
import { styleSheetCustom } from "../utility/styles";
import { GetCurrentID } from "../utility/Common";

export default function PasswordPopup({ isShow, onSubmit, whoCall }) {
  const [password, setPassword] = useState("");

  const checkPassword = (password) => {
    return GetCurrentID("currentPin") === password;
  };

  const handlePasswordSubmit = (type) => {
    result = false;
    if (type === "submit") {
      result = checkPassword(password);
    }
    setPassword("");
    onSubmit(result, whoCall);
  };

  return (
    <Modal isVisible={isShow}>
      <View style={styles.modalView}>
        <View
          style={[
            styles.container,
            { marginTop: 50, alignContent: "center", alignItems: "center" },
          ]}
        >
          <View style={[styles.rowView, { marginBottom: 30 }]}>
            <Text style={[styles.text_title, { fontSize: 50, color: "blue" }]}>
              Enter Password
            </Text>
          </View>
          <View style={styles.rowView}>
            <TextInput
              // Style={[
              //   styles.textInput,
              //   { fontSize: 50, height: 260, color: "green" },
              // ]}
              style={{ padding: 5, margin: 5, fontSize: 40, height: 80 }}
              placeholder="Enter PIN"
              secureTextEntry
              onChangeText={(text) => setPassword(text)}
              value={password}
            />
          </View>
          <View style={[styles.rowView, { marginTop: 80 }]}>
            <TouchableOpacity
              Style={[
                styles.submitButton,
                { backgroundColor: "lightblue", marginhorizontal: 20 },
              ]}
              onPress={() => handlePasswordSubmit("cancel")}
            >
              <Text style={[styles.buttonText, { fontSize: 40, color: "red" }]}>
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              Style={styles.submitButton}
              onPress={() => handlePasswordSubmit("submit")}
            >
              <Text
                style={[styles.buttonText, { fontSize: 40, color: "green" }]}
              >
                Submit
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create(styleSheetCustom);
