import * as SecureStore from "expo-secure-store";
import { GetStorageKey, GenerateNewId } from "./Common";

/* LOCAl STORAGE*/

export async function SaveNewData_local(type, keyname, content) {
  let result = false;
  //TODO: AI created it, need check
  console.log(
    `Common - SaveNewData_local : ` + keyname + "  Content: " + content
  );

  if (type === "account") {
    let value = await LoadData_local(GetStorageKey());

    if (value != "" && value != null) {
      let myAccount = AddNewAccount(
        GenerateNewId("account"),
        text_nickname,
        text_username,
        text_email,
        text_password
      );
      let blocks = JSON.parse(value);
      blocks.push(myAccount);
      value = JSON.stringify(blocks);
    } else {
      value = InitNewAccountList_local(
        GenerateNewId("account"),
        text_nickname,
        text_username,
        text_email,
        text_password
      );
    }
  } else if (type === "member") {
  } else if (type === "resource") {
  } else {
    return result;
  }

  // Save the user data in Storage
  try {
    // return await SecureStore.setItemAsync(keyname, content);
    return await SecureStore.setItemAsync(keyname, content);
  } catch (error) {
    // Error saving data

    console.log("Common - SaveNewData_local Error:");
    console.log(error);
    return false;
  }
}

export async function SaveUpdateData_local(type, keyname, content) {
  //TODO: AI created it, need check
  console.log(
    `Common - SaveUpdateData_local : ` + keyname + "  Content: " + content
  );

  // Save the user data in Storage
  try {
    // return await SecureStore.setItemAsync(keyname, content);
    return await SecureStore.setItemAsync(keyname, content);
  } catch (error) {
    // Error saving data

    console.log("Common - SaveUpdateData_local Error:");
    console.log(error);
    return false;
  }
}

export async function deleteData_local(type, keyname, content) {
  //TODO: need implement
}

/** Save data to Storage
 * @param {*} keyname : String
 * @param {*} content : String
 * @returns : Boolean
 */
// export async function SaveData_local(keyname, content) {
//   console.log(`Common - SaveData_local : ` + keyname + "  Content: " + content);
//   // Save the user data in Storage
//   try {
//     // return await SecureStore.setItemAsync(keyname, content);
//     return await SecureStore.setItemAsync(keyname, content);
//   } catch (error) {
//     // Error saving data
//     console.log("Common - SaveData_local Error:");
//     console.log(error);
//     return false;
//   }
// }

/** Load data from Storage
 * @param {*} keyname : String
 * @returns : String
 */
export async function LoadData_local(keyname) {
  // Load current account numbers and list in Storage
  try {
    const value = await SecureStore.getItemAsync(keyname);

    console.log(
      `LocalStore - LoadData_local : ` + keyname + "  Content: " + value
    );

    if (value !== null) {
      return value;
    } else {
      return "";
    }
  } catch (error) {
    console.log("LocalStore - LoadData_local Error:");
    console.log(error);
    return "";
  }
}

/**
 * Get account id by username and password
 * @param {*} username :string
 * @param {*} password :string
 * @returns : string
 */
export async function LoadAccountData_local(username, password) {
  let result = "{}";

  //get account list
  let accountList = await LoadData_local(GetStorageKey());

  if (accountList === "") {
    return result;
  }

  let dictAccountList = JSON.parse(accountList);

  for (let i = 0; i < dictAccountList.length; i++) {
    if (
      dictAccountList[i].username === username &&
      dictAccountList[i].password === password
    ) {
      let accountID = dictAccountList[i].accountID;
      let str_member = await LoadData_local(GetStorageKey(accountID));
      let dict_member = JSON.parse(str_member);
      let dict_account = dictAccountList[i];
      dict_member.nickname = dict_account.nickname;
      dict_member.email = dict_account.email;
      result = JSON.stringify(dict_member);
      break;
    }
  }

  console.log(`LocalStore - LoadAccountData_local : ${result}`);
  return result;
}

/**
 * check if the username or email is exist
 * @param {*} username
 * @param {*} email
 * @returns String
 */
export async function CheckAccountExist_local(username, email) {
  let result = "";

  //get account list
  let str_accountList = await LoadData_local(GetStorageKey());

  if (str_accountList === "") {
    result = "";
  } else {
    let dictAccountList = JSON.parse(str_accountList);

    for (let i = 0; i < dictAccountList.length; i++) {
      if (dictAccountList[i].username === username) {
        result = "Username";
      } else if (dictAccountList[i].email === email) {
        result = "Email";
      }
    }
  }
  console.log(`LocalStore - CheckAccountExist_local : ${result}`);
  return result;
}
