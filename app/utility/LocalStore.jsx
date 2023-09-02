import * as SecureStore from "expo-secure-store";
import { GetStorageKey, GenerateNewId } from "./Common";

/* LOCAl STORAGE*/

/**
 * Save new data to Storage
 * @param {*} type      accounts, members, resources, account_profile, member_profile
 * @param {*} storage_keyname   always use GetStorageKey()
 * @param {*} content   JSON String
 * @returns  true or false
 */
export async function SaveNewData_local(type, storage_keyname, content) {
  let result = false;

  //console.log(
  //   `LocalStore - SaveNewData_local : ` +
  //     storage_keyname +
  //     "  Content: " +
  //     content
  // );

  let dict_content = JSON.parse(content);
  let str_content = "";

  let blocks = [];
  let value = await LoadData_local("all", storage_keyname);

  if (value != "" && value != null) {
    blocks = JSON.parse(value);
  }

  if (type === "accounts") {
    blocks.push(dict_content);
    str_content = JSON.stringify(blocks);
  } else if (type === "members") {
    blocks.memberlist.push(dict_content);
    str_content = JSON.stringify(blocks);
  } else if (type === "resources") {
    blocks.resourcelist.push(dict_content);
    str_content = JSON.stringify(blocks);
  } else if (type === "account_profile") {
    str_content = content;
  } else if (type === "member_profile") {
    str_content = content;
  } else {
    //console.log("LocalStore - SaveNewData_local : else! " + result);
    return result;
  }

  // Save the user data in Storage
  try {
    //console.log("LocalStore - SaveNewData_local : done! " + str_content);
    return await SecureStore.setItemAsync(storage_keyname, str_content);
  } catch (error) {
    // Error saving data
    //console.log("LocalStore - SaveNewData_local Error:");
    //console.log(error);
    return false;
  }
}

/**
 * Update data to Storage
 * @param {*} type      accounts, members, resources, account_profile, member_profile
 * @param {*} storage_keyname   always use GetStorageKey()
 * @param {*} content   JSON String
 * @returns  true or false
 */
export async function SaveUpdateData_local(type, storage_keyname, content) {
  // console.log(
  //   `Common - SaveUpdateData_local : ` +
  //     storage_keyname +
  //     "  Content: " +
  //     content
  // );

  let dict_update_content = JSON.parse(content);
  let str_content = "";
  let blocks = [];
  let db_data = await LoadData_local("all", storage_keyname);
  if (db_data != "" && db_data != null) {
    dict_db_data = JSON.parse(db_data);

    if (type === "accounts") {
      const updatedData = dict_db_data.map((item) => {
        if (item.accountID === dict_update_content.accountID) {
          //console.log("SaveUpdateData_local_account", item);
          // Update the desired key's value here
          return {
            ...item,
            //accountID: accountID,
            nickname: dict_update_content.nickname,
            username: dict_update_content.username,
            email: dict_update_content.email,
            password: dict_update_content.password,
            pin: dict_update_content.pin,
            status: dict_update_content.status,
          };
        }
        return item;
      });
      blocks = updatedData;
    } else if (type === "account_profile") {
      const updatedData = () => {
        //console.log("SaveUpdateData_local_account_profile", item);
        // Update the desired key's value here
        return {
          ...item,
          //accountID: accountID,
          nickname: dict_update_content.nickname,
          email: dict_update_content.email,
        };
      };
      blocks = updatedData;
    } else if (type === "members") {
      const updatedData = dict_db_data.memberlist.map((item) => {
        if (item.key === dict_update_content.key) {
          //console.log("SaveUpdateData_local_member_list", item);
          // Update the desired key's value here
          return {
            ...item,
            //   key:
            title: dict_update_content.title,
            description: dict_update_content.description,
            icon: dict_update_content.icon,
            memo: dict_update_content.memo,
            status: dict_update_content.status,
          };
        }
        return item;
      });
      dict_db_data.memberlist = updatedData;
      blocks = dict_db_data;
    } else if (type === "resources") {
      const updatedData = dict_db_data.resourcelist.map((item) => {
        if (item.rid === dict_update_content.rid) {
          // console.log("SaveUpdateData_local_resources : ", item);
          // Update the desired key's value here
          return {
            ...item,
            //   rid:
            title: dict_update_content.title,
            description: dict_update_content.description,
            default_url: dict_update_content.default_url,
            icon: dict_update_content.icon,
            memo: dict_update_content.memo,
            status: dict_update_content.status,
            url_include: dict_update_content.url_include,
            title_include: dict_update_content.title_include,
            whitelist: dict_update_content.whitelist,
            use_url_include: dict_update_content.use_url_include,
            use_title_include: dict_update_content.use_title_include,
            use_whitelist: dict_update_content.use_whitelist,
            last_url: dict_update_content.last_url,
            time_limit: dict_update_content.time_limit,
          };
        }
        return item;
      });
      dict_db_data.resourcelist = updatedData;
      blocks = dict_db_data;
    } else {
      return str_content;
    }

    str_content = JSON.stringify(blocks);
    //console.log("SaveUpdateData_local Str_content", str_content);
  }

  // Save the user data in Storage
  try {
    return await SecureStore.setItemAsync(storage_keyname, str_content);
  } catch (error) {
    // Error saving data

    //console.log("Common - SaveUpdateData_local Error:");
    //console.log(error);
    return false;
  }
}

/**
 * Delete data from Storage (set the status ="-1")
 * @param {*} type        accounts, members, resources, account_profile, member_profile
 * @param {*} storage_keyname   always use GetStorageKey()
 * @param {*} keyToDelete   key of the data
 * @returns true or false
 */
export async function deleteData_local(type, storage_keyname, keyToDelete) {
  let result = false;

  let str_content = "";
  let db_data = await LoadData_local("all", storage_keyname);
  if (db_data != "" && db_data != null) {
    dict_db_data = JSON.parse(db_data);
  } else {
    return result;
  }

  if (type == "accounts") {
    const updatedDictionary = dict_db_data.filter(
      (item) => item.accountID !== keyToDelete
    );
    str_content = JSON.stringify(updatedDictionary);
  } else if (type == "members") {
    const updatedDictionary = dict_db_data.memberlist.filter(
      (item) => item.key !== keyToDelete
    );
    dict_db_data.memberlist = updatedDictionary;
    str_content = JSON.stringify(dict_db_data);
  } else if (type == "resources") {
    const updatedDictionary = dict_db_data.resourcelist.filter(
      (item) => item.rid !== keyToDelete
    );
    dict_db_data.resourcelist = updatedDictionary;
    str_content = JSON.stringify(dict_db_data);
  } else if (type === "account_profile" || type === "member_profile") {
    try {
      //console.log("LocalStore - Delete_local 1: done! " + str_content);
      return await SecureStore.deleteItemAsync(storage_keyname);
    } catch (error) {
      // Error saving data
      //console.log("LocalStore - SaveNewData_local Error:");
      //console.log(error);
      return false;
    }
  } else {
    //console.log("LocalStore - deleteData_local : else! " + result);
    return result;
  }

  // Save the user data in Storage
  try {
    //console.log(
    // "LocalStore - deleteData_local : done! " + storage_keyname + str_content
    // );
    return await SecureStore.setItemAsync(storage_keyname, str_content);
  } catch (error) {
    // Error saving data
    //console.log("LocalStore - deleteData_local Error:");
    //console.log(error);
    return false;
  }
}

/**
 * Load data from Storage
 * @param {*} datatype    accounts, members, resources, account_profile, member_profile
 * @param {*} storage_keyname  always use GetStorageKey()
 * @returns String
 */
export async function LoadData_local(datatype, storage_keyname) {
  if (datatype === "") {
    return "";
  }

  // Load current account numbers and list in Storage
  try {
    const value = await SecureStore.getItemAsync(storage_keyname);

    //console.log(
    // `LocalStore - LoadData_local : ` + storage_keyname + "  Content: " + value
    // );

    if (value !== null) {
      return value;
    } else {
      return "";
    }
  } catch (error) {
    //console.log("LocalStore - LoadData_local Error:");
    //console.log(error);
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
  let accountList = await LoadData_local("account_list", GetStorageKey());

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
      let str_member = await LoadData_local(
        "accounts",
        GetStorageKey(accountID)
      );
      let dict_member = JSON.parse(str_member);
      let dict_account = dictAccountList[i];
      dict_member.nickname = dict_account.nickname;
      dict_member.pin = dict_account.pin;
      result = JSON.stringify(dict_member);
      break;
    }
  }

  //console.log(`LocalStore - LoadAccountData_local : ${result}`);
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
  let str_accountList = await LoadData_local("account_list", GetStorageKey());

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
  //console.log(`LocalStore - CheckAccountExist_local : ${result}`);
  return result;
}

/**
 *
 * @param {*} currentAccountID
 * @param {*} Username
 * @param {*} Email
 * @returns
 */
export async function CheckAccountUnique_local(
  currentAccountID,
  Username,
  Email
) {
  let str_accountList = await LoadData_local("account_list", GetStorageKey());
  let dict_db_data = JSON.parse(str_accountList);

  const dict_username = dict_db_data.filter(
    (item) => item.username === Username
  );

  if (dict_username.length > 0) {
    if (dict_username[0].accountID !== currentAccountID) {
      return "Username is not available!!";
    }
  }

  const dict_email = dict_db_data.filter((item) => item.email === Email);
  if (dict_email.length > 0) {
    if (dict_email[0].accountID !== currentAccountID) {
      return "Email is not available!!";
    }
  }
  return "";
}
