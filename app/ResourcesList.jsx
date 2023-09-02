import React, { useEffect, useState } from "react";
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
import { GetCurrentID, SetCurrentID, GetStorageKey } from "./utility/Common";
import { styleSheetCustom } from "./utility/styles";
import { SaveNewData, LoadData } from "./utility/Store";

import { InitResourceProfile } from "./utility/DataStructure";
import ResourceCard from "./components/resource_card";
import PasswordPopup from "./components/popup_password";

export default function ResourcesList() {
  const params = useLocalSearchParams();
  const { needLoad } = params;

  const [isLoading, setIsLoading] = useState(needLoad);
  const [resourceProfile, setResourceList] = useState({});

  const [whoCall, setWhoCall] = useState("");
  const [currentItem, setCurrentItem] = useState({});
  const [isModalVisible, setModalVisible] = useState(false);

  const currentAccountID = GetCurrentID("currentAccountID");
  const focusMemberID = GetCurrentID("focusMemberID");
  const currerntMemberName = GetCurrentID("currentMemberName");

  // ResourceCard click event
  const clickResourceCard = (item, isEditMode) => {
    if (isLoading) return;
    SetCurrentID("currentResourceID", item.rid);
    setCurrentItem(item);

    let whatIsMode = item.rid === "0" ? true : isEditMode;

    if (whatIsMode == true) {
      setWhoCall("resources");
      setModalVisible(true);
    } else {
      router.push({
        pathname: "/Browser",
        params: {
          passItem: JSON.stringify(item),
          whatMode: whatIsMode.toString(),
        },
      });
    }
  };

  const handleSubmit = (result, whoCall) => {
    setModalVisible(false);
    console.log("Resources - handleSubmit: " + result);
    if (result) {
      if (whoCall === "resources") {
        router.push({
          pathname: "/Browser",
          params: {
            passItem: JSON.stringify(currentItem),
            whatMode: "true",
          },
        });
      }
    } else {
      alert("Invalid pin. Please try again.");
    }
  };

  const clickLogout = async () => {
    SetCurrentID("focusMemberID", "");
    SetCurrentID("currentMemberName", "");

    let str_member = await LoadData(
      "accounts",
      GetStorageKey(currentAccountID)
    );

    router.push({
      pathname: "/MembersList",
      params: { account_profile: str_member },
    });
  };

  useEffect(() => {
    async function fetchData() {
      // For test clear this account profile
      // await SaveNewData("member_profile", GetStorageKey(currentAccountID, focusMemberID), "");

      try {
        // Pre-load
        let value = await LoadData(
          "member_profile",
          GetStorageKey(currentAccountID, focusMemberID)
        );

        // console.log("ResourcesList  - fetchData(): " + value);
        let tmpMemberProfile = {};

        if (value !== "") {
          tmpMemberProfile = JSON.parse(value);
        } else {
          value = InitResourceProfile(focusMemberID);
          tmpMemberProfile = JSON.parse(value);
          await SaveNewData(
            "member_profile",
            GetStorageKey(currentAccountID, focusMemberID),
            value
          );
        }
        setResourceList(tmpMemberProfile);
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
      <SafeAreaProvider style={styles.container}>
        <View style={[styles.rowView]}>
          <TouchableOpacity
            style={styles.submitButton}
            onPress={() => clickLogout()}
          >
            <Text style={styles.buttonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
        <PasswordPopup
          isShow={isModalVisible}
          onSubmit={handleSubmit}
          whoCall={whoCall}
        />
        <View style={[styles.rowView]}>
          <Text style={[styles.buttonText, { color: "black" }]}>
            Hello, {currerntMemberName}. Press to view the resources. Long press
            to edit.
          </Text>
        </View>
        <ScrollView>
          <View style={[styles.rowView, styles.rowView_wrap]}>
            {resourceProfile.resourcelist.map((item) => (
              <ResourceCard
                key={item.rid}
                item={item}
                onSubmitResource={() => clickResourceCard(item, false)}
                onSubmitLongResource={() => clickResourceCard(item, true)}
              />
            ))}
          </View>
        </ScrollView>
      </SafeAreaProvider>
    );
  }
}
const styles = StyleSheet.create(styleSheetCustom);
