/**
 * Common functions for all pages and components
 * Global variables for all pages and components
 * Save and load data in Storage
 */
import * as Crypto from "expo-crypto";
import * as SecureStore from "expo-secure-store";

/* Global variables */
// App settings
const appName = "KidWebBrowser";

// Account data
let currentAccountID = ""; // Current account ID
let focusMemberID = ""; // focus member ID in current account ID
let currentResourceID = ""; // Current Resource ID

let timeLeft = 0; // Time left for current resource

export function setTimeLeft(value) {
  timeLeft = value;
}

export function getTimeLeft() {
  return timeLeft;
}

/* Common functions for all pages and components*/

/** Save data to Storage
 * @param {*} keyname : String
 * @param {*} content : String
 * @returns : Boolean
 */
export async function SaveData_local(keyname, content) {
  console.log(`Saveing data....`);
  // Save the user data in Storage
  try {
    // return await SecureStore.setItemAsync(keyname, content);
    return await SecureStore.setItemAsync(keyname, content);
  } catch (error) {
    // Error saving data
    console.log(error);
    return false;
  }
}

/** Load data from Storage
 * @param {*} keyname : String
 * @returns : Boolean
 */
export async function LoadData_local(keyname) {
  // Load current account numbers and list in Storage
  try {
    console.log("Loading Data.....");

    // const value = await SecureStore.getItemAsync(keyname);
    const value = await SecureStore.getItemAsync(keyname);

    if (value !== null) {
      return value;
    } else {
      return "";
    }
  } catch (error) {
    console.log(error);
    return "";
  }
}

/**
 * Get Storage Key
 * @param {*} accountID
 * @param {*} memberID
 * @param {*} resourceID
 * @returns : string
 */
export function GetStorageKey(accountID = "", memberID = "", resourceID = "") {
  if (accountID === "" && memberID === "" && resourceID === "") {
    //In the remote version, the account list is stored in the server
    return appName + "." + "accountList"; // Acount List storage Key (just for local version)
  } else if (accountID != "" && memberID === "" && resourceID === "") {
    return appName + "." + accountID; // Account storage data Key
  } else if (accountID != "" && memberID != "" && resourceID === "") {
    return appName + "." + accountID + "-" + memberID; // Member data
  } else if (accountID != "" && memberID != "" && resourceID != "") {
    return appName + "." + accountID + "-" + memberID + "-" + resourceID; // Resource data
  } else {
    return "";
  }
}

/**
 * check if the username or email is exist
 * @param {*} username
 * @param {*} email
 * @returns
 */
export async function CheckUsernameisExist(username, email) {
  //get account list
  let accountList = await LoadData_local(GetStorageKey());

  if (accountList === "") {
    return "0";
  }

  let dictAccountList = JSON.parse(accountList);
  for (let i = 0; i < dictAccountList.length; i++) {
    if (dictAccountList[i].username === username) {
      return 1;
    } else if (dictAccountList[i].email === email) {
      return 2;
    }
  }
  return "0";
}

/**
 * Get account id by username and password
 * @param {*} username :string
 * @param {*} password :string
 * @returns : string
 */
export async function GetAccountID(username, password) {
  //get account list
  let accountList = await LoadData_local(GetStorageKey());

  if (accountList === "") {
    return "";
  }

  let dictAccountList = JSON.parse(accountList);
  let accountID = "";
  for (let i = 0; i < dictAccountList.length; i++) {
    if (
      dictAccountList[i].username === username &&
      dictAccountList[i].password === password
    ) {
      accountID = dictAccountList[i].accountID;
      break;
    }
  }
  return accountID;
}

/**
 * @description This function generates a random string as account / member ID
 * @param {string} idType : [account , member, resource]
 * @returns {string} random string
 */
export function GenerateNewId(idType) {
  const UUID = Crypto.randomUUID();
  if (idType === "account") {
    return "a-" + UUID;
  } else if (idType === "member") {
    return "m-" + UUID;
  } else if (idType === "resource") {
    return "r-" + UUID;
  } else {
    return "";
  }
}

/**
 * Getters for global variables
 * @param {*} keyname : String
 * @returns : String
 */
export function GetCurrentID(keyname) {
  console.log("GetInfo: " + keyname);
  if (keyname === "currentAccountID") {
    console.log("currentAccountID: " + currentAccountID);
    return currentAccountID;
  } else if (keyname === "focusMemberID") {
    console.log("focusMemberID: " + focusMemberID);
    return focusMemberID;
  } else if (keyname === "currentResourceID") {
    console.log("currentResourceID: " + currentResourceID);
    return currentResourceID;
  } else {
    return "";
  }
}

/** Set global variables
 * @param {*} keyname : String
 * @param {*} content : String
 * @returns : Boolean
 * */
export function SetCurrentID(keyname, content) {
  console.log("SetInfo: " + keyname + " " + content);
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
async function LoadCurrentData(currentID) {
  try {
    console.log("LoadCurrentData");

    currentAccountID = currentID;
    currentUserProfileSetting = await SecureStore.getItemAsync(
      `${appName}:currentUserProfileSetting`
    );
    currentUserData = await SecureStore.getItemAsync(
      `${appName}:currentUserData`
    );

    if (currentAccountID === null) {
      currentAccountID = "";
    }
    if (currentUserData === null) {
      currentUserData = "";
    }
    return true;
  } catch (error) {
    currentAccountID = "";
    currentUserProfileSetting = "";
    currentUserData = "";
    console.log(error);
    return false;
  }
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
