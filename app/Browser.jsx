import React, { useState, useRef, useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { WebView } from "react-native-webview";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";

import {
  GetCurrentID,
  SetCurrentID,
  GetStorageKey,
  AddOneTotalTimeSpend,
  getTotalTimeSpend,
} from "./utility/Common";

import { SaveNewData, SaveUpdateData, deleteData } from "./utility/Store";
import { styleSheetCustom } from "./utility/styles";

import BrowserViewBar from "./components/browser_view_bar";
import SearchBar from "./components/search_bar";
import BrowserEditBar from "./components/browser_edit_bar";

export default function Browser() {
  const customUserAgent =
    "Mozilla/5.0 (iPhone; CPU iPhone OS 15_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/102.0.5005.87 Mobile/15E148 Safari/604.1";

  const params = useLocalSearchParams();
  const { passItem, whatMode } = params;
  let item = JSON.parse(passItem);
  let isEditMode = whatMode === "true" ? true : false;

  const [webSourceUrl, setWebSourceUrl] = useState(item.last_url);
  const [currentUrl, setCurrentUrl] = useState(item.last_url);
  const [currentWebTitle, setCurrentWebTitle] = useState("");

  const [resourceProfile, setResourceList] = useState(item);

  const currentAccountID = GetCurrentID("currentAccountID");
  const focusMemberID = GetCurrentID("focusMemberID");
  const currentResourceID = GetCurrentID("currentResourceID");

  const urlList = item.url_include.split(",");
  const titleList = item.title_include.split(",");
  const whitelistList = item.whitelist.split(",");

  const webViewRef = useRef(null);

  const [timeLeft, setTimeLeft] = useState(
    parseInt(item.time_limit) - getTotalTimeSpend()
  );
  const [isShowViewMenu, setIsShowViewMenu] = useState(false);

  // Times up function
  useEffect(() => {
    if (isEditMode) return;
    if (timeLeft <= 0) {
      router.replace("/TimesUp");
      return;
    }

    const timer = setInterval(() => {
      AddOneTotalTimeSpend();
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000 * 60);
    //TODO: change to 1000 * 60

    return () => clearInterval(timer);
  }, [timeLeft]);

  // console.log("Browser - currentResourceID : " + currentResourceID);

  const jumpToMembers = async () => {
    SetCurrentID("currentResourceID", "");
    router.push({
      pathname: "/ResourcesList",
      params: { needLoad: true },
    });
  };

  /**
   * @description browser_edit_bar submit the new resource profile to here
   *              and this step save it to local storage
   * @param {*} newResourceProfile
   */
  const handleEditSubmit = async (newResourceProfile) => {
    if (newResourceProfile === null) {
      // Cancel button
      // Just return to home page
      jumpToMembers();
      return;
    } else if (newResourceProfile === "delete") {
      // Delete button
      // Delete the current resource profile
      await Alert.alert(
        "Delete This resource",
        "Deleted resource can not recover! Are you sure?",
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
                try {
                  await deleteData(
                    "resources",
                    GetStorageKey(currentAccountID, focusMemberID),
                    currentResourceID
                  );

                  alert("Member has been deleted!");

                  await jumpToMembers();
                } catch (e) {
                  console.log(
                    "Browser- handleDelete - deleteData - transactions - error: " +
                      e
                  );
                }
              }
            },
          },
        ],
        { cancelable: false }
      );
      return;
    }

    let result = "";
    if (currentResourceID === "0") {
      //Add new records
      result = await SaveNewData(
        "resources",
        GetStorageKey(currentAccountID, focusMemberID),
        JSON.stringify(newResourceProfile)
      );
    } else {
      result = await SaveUpdateData(
        "resources",
        GetStorageKey(currentAccountID, focusMemberID),
        JSON.stringify(newResourceProfile)
      );
    }

    jumpToMembers();
    return;
  };

  /**
   * @description This function is called when the user submits the search
   * @param {*} searchText
   * @returns {void}
   *
   */
  const handleSubmit = (searchText) => {
    setWebSourceUrl(`${searchText}`);
  };

  const handleMenuClicked = async (type) => {
    if (type === "GoBack") {
      webViewRef.current.goBack();
    } else if (type === "GoForward") {
      webViewRef.current.goForward();
    } else if (type === "Reload") {
      webViewRef.current.reload();
    } else if (type === "Exit") {
      await updateLastURL(currentUrl);
      SetCurrentID("currentResourceID", "");
      // console.log("Browser - Exit: " + currentResourceID);
      router.push({
        pathname: "/ResourcesList",
        params: { needLoad: false },
      });
    } else if (type === "Hide") {
      setIsShowViewMenu(false);
    } else if (type === "Home") {
      setWebSourceUrl(item.default_url);
      console.log("Browser - Home: " + item.default_url);
    }
  };

  /**
   * Update last url to local storage
   * @param {*} myfocusMemberID
   * @param {*} newURL
   */
  const updateLastURL = async (newURL) => {
    // console.log("Browser - updateLastURL: " + focusMemberID + "  " + newURL);
    let newResourceProfile = resourceProfile;
    newResourceProfile.last_url = newURL;
    // console.log(
    //   "Browser - updateLastURL: " + JSON.stringify(newResourceProfile)
    // );

    await SaveUpdateData(
      "resources",
      GetStorageKey(currentAccountID, focusMemberID),
      JSON.stringify(newResourceProfile)
    );
  };

  const handleUrlChange = (nativeEvent) => {
    const { url, title } = nativeEvent;
    // console.log("Browser - handleUrlChange url=" + url + " title=" + title);
    // console.log("currentURL = " + currentUrl);
    if (isEditMode) {
      setCurrentUrl(url);
      setCurrentWebTitle(title);
    } else {
      if (!checkWeb(url, title)) {
        // setUrl(item.default_url);
        webViewRef.current.goBack();
      } else {
        setCurrentUrl(url);
        setCurrentWebTitle(title);
      }
    }
  };

  const handleLoadStart = (event) => {
    const { url, title } = event.nativeEvent;
    // console.log("Browser - handleLoadStart url=" + url + " title=" + title);
    // console.log("currentURL = " + currentUrl);
  };

  const handleLoadEnd = (event) => {
    const { url, title } = event.nativeEvent;
  };

  const clickHandler = () => {
    setIsShowViewMenu(!isShowViewMenu);
  };

  const checkWeb = (currentUrl, currentTitle) => {
    if (currentUrl === item.default_url) {
      return true;
    }

    if (item.use_url_include) {
      //check url
      for (let i = 0; i < urlList.length; i++) {
        if (currentUrl.includes(urlList[i])) {
          return true;
        }
      }
    }

    if (item.use_title_include) {
      //check title
      for (let i = 0; i < titleList.length; i++) {
        if (currentTitle.includes(titleList[i])) {
          return true;
        }
      }
    }

    if (item.use_whitelist) {
      //check whitelist
      for (let i = 0; i < whitelistList.length; i++) {
        if (currentUrl.includes(whitelistList[i])) {
          return true;
        }
      }
    }
    return false;
  };

  return (
    <SafeAreaProvider style={styles.container}>
      {isEditMode ? (
        <View>
          <SearchBar
            onSubmit={handleSubmit}
            updateURL={currentUrl}
            onGoBack={() => handleMenuClicked("GoBack")}
            onGoForward={() => handleMenuClicked("GoForward")}
            onReload={() => handleMenuClicked("Reload")}
          />
          <BrowserEditBar
            onEditBarSubmit={handleEditSubmit}
            resourceList={resourceProfile}
            updateURL={currentUrl}
            updateTitle={currentWebTitle}
          />
        </View>
      ) : (
        isShowViewMenu && (
          <BrowserViewBar
            resourceList={resourceProfile}
            timeLeft={timeLeft}
            onClick={handleMenuClicked}
          />
        )
      )}
      <WebView
        originWhitelist={["*"]}
        ref={webViewRef}
        style={styles.webview}
        source={{ uri: webSourceUrl }}
        onNavigationStateChange={handleUrlChange}
        javaScriptEnabled={true}
        userAgent={customUserAgent}
        sharedCookiesEnabled={true}
        onLoadStart={handleLoadStart}
        onLoadEnd={handleLoadEnd}
      />
      {/* <StatusBar style="auto" /> */}

      {!isEditMode && (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={clickHandler}
          style={styles.touchableOpacityStyle}
        >
          <MaterialCommunityIcons
            name="arrow-top-left-bold-box"
            size={50}
            color="orange"
          />
        </TouchableOpacity>
      )}
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create(styleSheetCustom);
