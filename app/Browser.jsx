import React, { useState, useRef, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { WebView } from "react-native-webview";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";

import {
  GetCurrentID,
  SetCurrentID,
  LoadData_local,
  SaveData_local,
  GetStorageKey,
} from "./utility/Common";
import BrowserViewBar from "./components/browser_view_bar";
import SearchBar from "./components/search_bar";
import BrowserEditBar from "./components/browser_edit_bar";

export default function Browser() {
  const params = useLocalSearchParams();
  const { passItem, whatMode } = params;
  let item = JSON.parse(passItem);
  let isEditMode = whatMode === "true" ? true : false;
  console.log("WhatMode in browser: " + whatMode);

  console.log("Browser - item here: " + passItem);
  console.log(isEditMode);

  const [url, setUrl] = useState(item.last_url);
  const [webTitle, setWebTitle] = useState("");
  // const [favicon, setFavicon] = useState("");

  const [resourceProfile, setResourceList] = useState(item);

  const currentAccountID = GetCurrentID("currentAccountID");
  const focusMemberID = GetCurrentID("focusMemberID");
  const currentResourceID = GetCurrentID("currentResourceID");

  const urlList = item.url_include.split(",");
  const titleList = item.title_include.split(",");
  const whitelistList = item.whitelist.split(",");

  const webViewRef = useRef(null);

  const [timeLeft, setTimeLeft] = useState(parseInt(item.time_limit));
  const [isShowViewMenu, setIsShowViewMenu] = useState(false);

  const customUserAgent =
    "Mozilla/5.0 (iPhone; CPU iPhone OS 15_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/102.0.5005.87 Mobile/15E148 Safari/604.1";

  // Times up function
  useEffect(() => {
    if (isEditMode) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000 * 60);

    return () => clearInterval(timer);
  }, []);

  function timesUp() {
    router.replace("/TimesUp");
  }

  if (timeLeft === 0) {
    timesUp();
  }

  console.log("timeLeft " + timeLeft.toString());

  console.log("currentResourceID - Browser: " + currentResourceID);
  console.log("item.last_url: " + url + "   " + item.last_url);

  /**
   * @description browser_edit_bar submit the new resource profile to here
   *              and this step save it to local storage
   * @param {*} newResourceProfile
   */
  const handleEditSubmit = async (newResourceProfile) => {
    if (newResourceProfile === null) {
      // Cancel button
      // Just return to home page
      SetCurrentID("currentResourceID", "");
      router.push({
        pathname: "/Home",
        params: { needLoad: false },
      });
    }

    // Clicked submit button
    // Save resource profile to local storage
    console.log("newResourceProfile", newResourceProfile);

    let value = await LoadData_local(
      GetStorageKey(currentAccountID, focusMemberID)
    );

    if (value !== "") {
      let tmpMemberProfile = JSON.parse(value);

      let keyToUpdate = newResourceProfile.rid;

      const updatedData = tmpMemberProfile.resourcelist.map((item) => {
        if (item.rid === keyToUpdate) {
          console.log("item_KKKK", item);
          // Update the desired key's value here
          return {
            ...item,
            // rid: "0",
            // title: "Add resource",
            // description: "Add resource",
            default_url: newResourceProfile.default_url,
            icon: newResourceProfile.icon,
            memo: newResourceProfile.memo,
            status: newResourceProfile.status,
            url_include: newResourceProfile.url_include,
            title_include: newResourceProfile.title_include,
            whitelist: newResourceProfile.whitelist,
            use_url_include: newResourceProfile.use_url_include,
            use_title_include: newResourceProfile.use_title_include,
            use_whitelist: newResourceProfile.use_whitelist,
            last_url: newResourceProfile.default_url,
          };
        }
        return item;
      });

      if (currentResourceID === "0") {
        //Add new records
        tmpMemberProfile.resourcelist.push(newResourceProfile);
      } else {
        tmpMemberProfile.resourcelist = updatedData;
      }
      value = JSON.stringify(tmpMemberProfile);
      console.log("value_KK", value);
      await SaveData_local(
        GetStorageKey(currentAccountID, focusMemberID),
        value
      );
    }

    SetCurrentID("currentResourceID", "");
    router.push({
      pathname: "/Home",
      params: { needLoad: true },
    });
  };

  /**
   * @description This function is called when the user submits the search
   * @param {*} searchText
   * @returns {void}
   *
   */
  const handleSubmit = (searchText) => {
    setUrl(`${searchText}`);
  };

  const handleMenuClicked = (type) => {
    if (type === "GoBack") {
      webViewRef.current.goBack();
    } else if (type === "GoForward") {
      webViewRef.current.goForward();
    } else if (type === "Reload") {
      webViewRef.current.reload();
    } else if (type === "Exit") {
      router.push({
        pathname: "/Home",
        params: { needLoad: false },
      });
    } else if (type === "Hide") {
      setIsShowViewMenu(false);
    }
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

  const handleUrlChange = (newNavState) => {
    const { url, title } = newNavState;
    if (isEditMode) {
      setUrl(url);
      setWebTitle(title);
    } else {
      console.log("--------------------");
      if (!checkWeb(url, title)) {
        console.log("checkWeb false");
        console.log(item.default_url);
        setUrl(item.default_url);
        console.log(url);
        webViewRef.current.goBack();
      }
    }
  };

  const clickHandler = () => {
    setIsShowViewMenu(!isShowViewMenu);
  };

  return (
    <View style={styles.container}>
      {isEditMode ? (
        <View>
          <SearchBar
            onSubmit={handleSubmit}
            updateURL={url}
            onGoBack={() => handleMenuClicked("GoBack")}
            onGoForward={() => handleMenuClicked("GoForward")}
            onReload={() => handleMenuClicked("Reload")}
          />
          <BrowserEditBar
            onSubmit={handleEditSubmit}
            resourceList={resourceProfile}
            updateURL={url}
            updateTitle={webTitle}
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
        ref={webViewRef}
        style={styles.webview}
        source={{ uri: url }}
        onNavigationStateChange={handleUrlChange}
        javaScriptEnabled={true}
        userAgent={customUserAgent}
        sharedCookiesEnabled={true}
      />
      {/* <StatusBar style="auto" /> */}

      <TouchableOpacity
        activeOpacity={0.7}
        onPress={clickHandler}
        style={styles.touchableOpacityStyle}
      >
        {/* <Image
          //We are making FAB using TouchableOpacity with an image
          //We are using online image here
          source={{
            uri: "https://raw.githubusercontent.com/AboutReact/sampleresource/master/plus_icon.png",
          }}
          //You can use you project image Example below
          //source={require('./images/float-add-icon.png')}
          style={styles.floatingButtonStyle}
        />
         */}

        <MaterialCommunityIcons
          name="microsoft-xbox-controller-menu"
          size={50}
          color="orange"
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    paddingTop: 40,
    paddingBottom: 5,
    paddingHorizontal: 5,
  },
  webview: {
    marginTop: 10,
  },
  touchableOpacityStyle: {
    position: "absolute",
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    // left: 10,
    // top: 90,
    right: 30,
    bottom: 30,
  },
  floatingButtonStyle: {
    resizeMode: "contain",
    width: 50,
    height: 50,
    // backgroundColor: "black",
  },
});
