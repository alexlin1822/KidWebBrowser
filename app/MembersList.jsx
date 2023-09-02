import React, { useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";

import {
  ActivityIndicator,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";

import { GetCurrentID, SetCurrentID } from "./utility/Common";
import { styleSheetCustom } from "./utility/styles";

import PeopleCard from "./components/people_card";
import PasswordPopup from "./components/popup_password";

export default function MembersList() {
  const params = useLocalSearchParams();
  const { account_profile } = params;

  const [isLoading, setIsLoading] = useState(false);

  const [whoCall, setWhoCall] = useState("");
  const [currentItem, setCurrentItem] = useState({});
  const [isModalVisible, setModalVisible] = useState(false);

  const [dictAccountProfile, setDictMyAccountProfile] = useState(
    JSON.parse(account_profile)
  );

  // console.log("MembersList - account_profile: " + account_profile);
  // console.log(dictAccountProfile);

  const currentAccountID = GetCurrentID("currentAccountID");
  const currentNickName = GetCurrentID("currentNickName");

  // PeopleCard click event
  const clickPeopleCard = (item, isLongPress) => {
    // console.log("MembersList - clickPeopleCard: ");

    SetCurrentID("focusMemberID", item.key);
    SetCurrentID("currentMemberName", item.title);
    setCurrentItem(item);

    if (isLongPress || item.key === "0") {
      setWhoCall("members");
      setModalVisible(true);
    } else {
      router.push({
        pathname: "/ResourcesList",
        params: { needLoad: true },
      });
    }
  };

  const clickLogout = () => {
    SetCurrentID("currentAccountID", "");
    SetCurrentID("currentNickName", "");
    SetCurrentID("currentPin", "");
    router.replace("/Login");
  };

  clickSetting = () => {
    setWhoCall("Setting");
    setModalVisible(true);
  };

  const handleSubmit = (result, whoCall) => {
    setModalVisible(false);
    // console.log("MembersList - handleSubmit: " + result);
    if (result) {
      if (whoCall === "Setting") {
        router.replace("/Setting");
      } else if (whoCall === "members") {
        router.push({
          pathname: "/UserEdit",
          params: { passItem: JSON.stringify(currentItem) },
        });
      }
    } else {
      alert("Invalid pin. Please try again.");
    }
  };

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  } else {
    return (
      <SafeAreaProvider style={styles.container}>
        <View>
          <View style={styles.rowView}>
            <TouchableOpacity
              style={[styles.submitButton, { flex: 0.5 }]}
              onPress={() => clickLogout()}
            >
              <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.submitButton, { flex: 0.5 }]}
              onPress={() => clickSetting()}
            >
              <Text style={styles.buttonText}>Setting</Text>
            </TouchableOpacity>
          </View>
          <PasswordPopup
            isShow={isModalVisible}
            onSubmit={handleSubmit}
            whoCall={whoCall}
          />
          <View style={styles.rowView}>
            <Text style={[styles.buttonText, { color: "blue" }]}>
              Hello, {currentNickName}. Press to view the resources. Long press
              to edit.
            </Text>
          </View>

          <ScrollView>
            <View style={[styles.rowView, styles.rowView_wrap]}>
              {dictAccountProfile.memberlist.map(
                (item) =>
                  item.status === "0" && (
                    <PeopleCard
                      key={item.key}
                      item={item}
                      onSubmitResource={() => clickPeopleCard(item, false)}
                      onSubmitLongResource={() => clickPeopleCard(item, true)}
                    />
                  )
              )}
            </View>
          </ScrollView>
        </View>
      </SafeAreaProvider>
    );
  }
}

const styles = StyleSheet.create(styleSheetCustom);
