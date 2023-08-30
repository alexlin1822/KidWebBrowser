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
import { GetCurrentID, SetCurrentID } from "./utility/Common";

import PeopleCard from "./components/people_card";

export default function MembersList() {
  const params = useLocalSearchParams();
  const { account_profile } = params;

  const [isLoading, setIsLoading] = useState(false);
  const [dictAccountProfile, setDictMyAccountProfile] = useState(
    JSON.parse(account_profile)
  );

  // console.log("MembersList - account_profile: " + account_profile);
  // console.log(dictAccountProfile);

  // const currentAccountID = GetCurrentID("currentAccountID");

  // PeopleCard click event
  const clickPeopleCard = (item, isLongPress) => {
    console.log("MembersList - clickPeopleCard: ");
    console.log(item);
    console.log(isLongPress);

    SetCurrentID("focusMemberID", item.key);

    if (isLongPress || item.key === "0") {
      router.push({
        pathname: "/UserEdit",
        params: { passItem: JSON.stringify(item) },
      });
    } else {
      router.push({
        pathname: "/ResourcesList",
        params: { needLoad: true },
      });
    }
  };

  const clickLogout = () => {
    router.replace("/Login");
  };

  // useEffect(() => {
  //   async function fetchData() {
  // For test clear this account profile
  // await SaveData_local(GetStorageKey(currentAccountID), "");

  //     try {
  // JSON.loads(result);
  // setMyAccountProfile(account_profile); // // Load account profile
  // console.log("MembersList  - fetchData(): " + result);
  // // Pre-load
  // let value = await LoadData_local(GetStorageKey(currentAccountID));
  // let tmpAccountProfile = {};
  // if (value !== "") {
  //   tmpAccountProfile = JSON.parse(value);
  // } else {
  //   value = InitAccountProfile(currentAccountID);
  //   tmpAccountProfile = JSON.parse(value);
  //   await SaveData_local(GetStorageKey(currentAccountID), value);
  // }
  // setMyAccountProfile(tmpAccountProfile);
  // console.log(
  //   "MembersList  - fetchData(): " + JSON.stringify(tmpAccountProfile)
  // );
  //     } catch (e) {
  //       console.warn(e);
  //     } finally {
  //       // Tell the application to render
  //       setIsLoading(false);
  //     }
  //   }

  //   fetchData();
  // }, []);

  console.log("MembersList - myAccountProfile: ");
  console.log(dictAccountProfile);

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  } else {
    return (
      <SafeAreaProvider>
        <ScrollView style={styles.container}>
          <View style={styles.rowView}>
            <TouchableOpacity
              style={styles.submitButton}
              onPress={() => clickLogout()}
            >
              <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.rowView}>
            <Text style={[styles.buttonText, { color: "black" }]}>
              Please select one:{" "}
            </Text>
          </View>
          <View style={styles.rowView}>
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
      </SafeAreaProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
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