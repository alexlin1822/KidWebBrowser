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

  console.log("MembersList - myAccountProfile: ");
  console.log(dictAccountProfile);

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  } else {
    return (
      <SafeAreaProvider style={styles.container}>
        <View>
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
              Please select one. Press to view the resources. Long press to
              edit.
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
