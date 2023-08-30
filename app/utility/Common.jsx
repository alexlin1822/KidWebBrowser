/**
 * Common functions for all pages and components
 * Global variables for all pages and components
 * Save and load data in Storage
 */
import * as Crypto from "expo-crypto";

/* Global variables */
// App settings
const appName = "KidWebBrowser";

// Account data
let currentAccountID = ""; // Current account ID
let focusMemberID = ""; // focus member ID in current account ID
let currentResourceID = ""; // Current Resource ID

let totalTimeSpend = 0; // Total time spend on current resource

let remoteMode = false; // Current user profile setting

export function resetTotalTimeSpend() {
  totalTimeSpend = 0;
}

export function AddOneTotalTimeSpend() {
  totalTimeSpend += 1;
}

export function getTotalTimeSpend() {
  return totalTimeSpend;
}

export function setIsRemote(value) {
  remoteMode = value;
}

export function getIsRemote() {
  return remoteMode;
}

/* Common functions for all pages and components*/

/**
 * Get Storage Key
 * @param {*} accountID
 * @param {*} memberID
 * @param {*} resourceID
 * @returns : string
 */
export function GetStorageKey(accountID = "", memberID = "", resourceID = "") {
  let result = "";
  if (accountID === "" && memberID === "" && resourceID === "") {
    //In the remote version, the account list is stored in the server
    result = appName + "." + "accountList"; // Acount List storage Key (just for local version)
  } else if (accountID != "" && memberID === "" && resourceID === "") {
    result = appName + "." + accountID; // Account profile storage data Key (Storaging member list and account settings)
  } else if (accountID != "" && memberID != "" && resourceID === "") {
    result = appName + "." + accountID + "-" + memberID; // (Storaging a member information and resources list)
  } else if (accountID != "" && memberID != "" && resourceID != "") {
    result = appName + "." + accountID + "-" + memberID + "-" + resourceID; // Not used
  }

  console.log(`Common - GetStorageKey : ${result}`);
  return result;
}

/**
 * @description This function generates a random string as account / member ID
 * @param {string} idType : [account , member, resource]
 * @returns {string} random string
 */
export function GenerateNewId(idType) {
  let result = "";
  const UUID = Crypto.randomUUID();

  if (idType === "account") {
    result = "a-" + UUID;
  } else if (idType === "member") {
    result = "m-" + UUID;
  } else if (idType === "resource") {
    result = "r-" + UUID;
  }

  console.log(`Common - GenerateNewId : ${result}`);
  return result;
}

/**
 * Getters for global variables
 * @param {*} keyname : String
 * @returns : String
 */
export function GetCurrentID(keyname) {
  if (keyname === "currentAccountID") {
    console.log("Common - GetInfo: currentAccountID: " + currentAccountID);
    return currentAccountID;
  } else if (keyname === "focusMemberID") {
    console.log("Common - GetInfo: focusMemberID: " + focusMemberID);
    return focusMemberID;
  } else if (keyname === "currentResourceID") {
    console.log("Common - GetInfo: currentResourceID: " + currentResourceID);
    return currentResourceID;
  } else {
    console.log("Common - GetInfo: " + keyname + " return empty string");
    return "";
  }
}

/** Set global variables
 * @param {*} keyname : String
 * @param {*} content : String
 * @returns : Boolean
 * */
export function SetCurrentID(keyname, content) {
  console.log("Common - SetInfo: " + keyname + " " + content);
  if (keyname === "currentAccountID") {
    currentAccountID = content;
  } else if (keyname === "focusMemberID") {
    focusMemberID = content;
  } else if (keyname === "currentResourceID") {
    currentResourceID = content;
  } else {
    return false;
  }
}

/* internal functions  */
/**
 * Load current account data in Storage
 * @param {*} currentID
 * @returns : Boolean
 */
// async function LoadCurrentData(currentID) {
//   try {
//     console.log("Common - LoadCurrentData");

//     currentAccountID = currentID;
//     currentMembersListSetting = await SecureStore.getItemAsync(
//       `${appName}:currentMembersListSetting`
//     );
//     currentUserData = await SecureStore.getItemAsync(
//       `${appName}:currentUserData`
//     );

//     if (currentAccountID === null) {
//       currentAccountID = "";
//     }
//     if (currentUserData === null) {
//       currentUserData = "";
//     }
//     return true;
//   } catch (error) {
//     currentAccountID = "";
//     currentMembersListSetting = "";
//     currentUserData = "";
//     console.log("Common - LoadCurrentData Error:");
//     console.log(error);
//     return false;
//   }
// }

/**
 * Get the icon from the URL by using google favicon API
 * @param {*} url
 * @returns
 */
export function getIcon(url) {
  let icon = "https://www.google.com/s2/favicons?domain=" + url + "&sz=48";
  console.log("browser_edit_bar  getIcon - icon : ", icon);
  return icon;
}

export function EncryptString(text) {
  if (text === "") {
    return "";
  }

  // const randomBytes1 = new Uint8Array(4);
  // const randomBytes2 = new Uint8Array(4);
  // getRandomValues(randomBytes1);
  // getRandomValues(randomBytes2);
  // console.log(randomBytes1);
  // console.log(randomBytes2);
  // return "";
  // let secretKey1 = Math.random().toString(36).slice(2, 6);
  // let secretKey2 = Math.random().toString(36).slice(2, 6);

  // const encrypted = CryptoJS.AES.encrypt(text, secretKey1 + secretKey2);
  // result = secretKey1 + encrypted.toString() + secretKey2;
  // return result;

  return CryptoJS.AES.encrypt(text, "aabbc").toString();
}

export function DecryptString(encryptedText) {
  if (encryptedText === "") {
    return "";
  }
  // let secretKey1 = encryptedText.slice(0, 4);
  // let secretKey2 = encryptedText.slice(-4);
  // encryptedText = encryptedText.slice(4, -4);
  // const bytes = CryptoJS.AES.decrypt(encryptedText, secretKey1 + secretKey2);
  const bytes = CryptoJS.AES.decrypt(encryptedText, "aabbc");
  return bytes.toString(CryptoJS.enc.Utf8);
}

// export function getShowNavigationBar() {
//   return showNavigationBar;
// }

// export function setShowNavigationBar(value) {
//   set_ShowNavigationBar(value);
// }

// let currentAccountID = ""; // Current account ID
// let currentMemberList = ""; // Current member list in current account

// let focusMemberID = ""; // focus member ID in current account ID
// let focusMemberBrowseList = ""; // resource list and settings of focus member (list of URL, title, description, icon, memo, status) Current account family member list and settings

// export function setCurrentAccountAndMemberList(value) {
//   currentAccountID = value;
// }
