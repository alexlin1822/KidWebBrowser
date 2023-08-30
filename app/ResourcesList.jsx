import React, { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import {
  ActivityIndicator,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import { GetCurrentID, SetCurrentID, GetStorageKey } from "./utility/Common";
import { styleSheetCustom } from "./utility/styles";
import {
  SaveNewData,
  SaveUpdateData,
  LoadData,
  deleteData,
} from "./utility/Store";

import { InitResourceProfile } from "./utility/DataStructure";
import ResourceCard from "./components/resource_card";

export default function ResourcesList() {
  const params = useLocalSearchParams();
  const { needLoad } = params;

  const [isLoading, setIsLoading] = useState(needLoad);
  const [resourceProfile, setResourceList] = useState({});

  const currentAccountID = GetCurrentID("currentAccountID");
  const focusMemberID = GetCurrentID("focusMemberID");

  // ResourceCard click event
  const clickResourceCard = (item, isEditMode) => {
    if (isLoading) return;
    console.log("ResourcesList click check point");

    SetCurrentID("currentResourceID", item.rid);

    let whatIsMode = item.rid === "0" ? true : isEditMode;
    console.log("whatIsMode" + whatIsMode);

    router.push({
      pathname: "/Browser",
      params: {
        passItem: JSON.stringify(item),
        whatMode: whatIsMode.toString(),
      },
    });
  };

  const clickLogout = async () => {
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

        console.log("ResourcesList  - fetchData(): " + value);
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
        console.log(
          "MembersList Fetch Data: " + JSON.stringify(tmpMemberProfile)
        );
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
      <SafeAreaProvider>
        <View style={styles.container}>
          <View style={styles.rowView}>
            <TouchableOpacity
              style={styles.submitButton}
              onPress={() => clickLogout()}
            >
              <Text style={styles.buttonText}>Go Back</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.container}>
            {resourceProfile.resourcelist.map((item) => (
              <ResourceCard
                key={item.rid}
                item={item}
                onSubmitResource={() => clickResourceCard(item, false)}
                onSubmitLongResource={() => clickResourceCard(item, true)}
              />
            ))}
          </View>
        </View>
      </SafeAreaProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    margin: 5,
  },
  rowView: {
    flexDirection: "row",
    alignItems: "center",
    padding: 2,
    marginVertical: 10,
    marginHorizontal: 5,
  },
  submitButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
    paddingHorizontal: 10,
    backgroundColor: "blue",
    borderRadius: 5,
    height: 50,
    marginTop: 20,
    marginBottom: 50,
  },
  buttonText: {
    padding: 10,
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});
