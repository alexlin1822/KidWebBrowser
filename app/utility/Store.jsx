import { getIsRemote } from "./Common";

import {
  SaveNewData_remote,
  SaveUpdateData_remote,
  deleteData_remote,
  LoadData_remote,
  LoadAccountData_remote,
  CheckAccountExist_remote,
  CheckAccountUnique_remote,
} from "./RemoteStore";

import {
  SaveNewData_local,
  SaveUpdateData_local,
  deleteData_local,
  LoadData_local,
  LoadAccountData_local,
  CheckAccountExist_local,
  CheckAccountUnique_local,
} from "./LocalStore";

/**
 * Save new data to Storage
 * @param {*} type      accounts, members, resources, account_profile, member_profile
 * @param {*} storage_keyname   always use GetStorageKey()
 * @param {*} content   JSON String
 * @returns  true or false
 */
export async function SaveNewData(type, storage_keyname, content) {
  if (getIsRemote()) {
    return await SaveNewData_remote(type, storage_keyname, content);
  } else {
    return await SaveNewData_local(type, storage_keyname, content);
  }
}

/**
 * Update data to Storage
 * @param {*} type      accounts, members, resources, account_profile, member_profile
 * @param {*} storage_keyname   always use GetStorageKey()
 * @param {*} content   JSON String
 * @returns  true or false
 */
export async function SaveUpdateData(type, storage_keyname, content) {
  if (getIsRemote()) {
    return await SaveUpdateData_remote(type, storage_keyname, content);
  } else {
    return await SaveUpdateData_local(type, storage_keyname, content);
  }
}

/**
 * Delete data from Storage (set the status ="-1")
 * @param {*} type        accounts, members, resources, account_profile, member_profile
 * @param {*} storage_keyname   always use GetStorageKey()
 * @param {*} keyToDelete  if keyToDelete is not null, then delete the key after load
 * @returns true or false
 */
export async function deleteData(type, storage_keyname, keyToDelete) {
  if (getIsRemote()) {
    return await deleteData_remote(type, storage_keyname, keyToDelete);
  } else {
    return await deleteData_local(type, storage_keyname, keyToDelete);
  }
}

/**
 * Load data from Storage
 * @param {*} datatype    accounts, members, resources, account_profile, member_profile
 * @param {*} storage_keyname  always use GetStorageKey()
 * @returns String
 */
export async function LoadData(datatype, storage_keyname) {
  if (getIsRemote()) {
    return await LoadData_remote(datatype, storage_keyname);
  } else {
    return await LoadData_local(datatype, storage_keyname);
  }
}

/**
 * Get account id by username and password
 * @param {*} username :string
 * @param {*} password :string
 * @returns : string
 */
export async function LoadAccountData(username, password) {
  if (getIsRemote()) {
    return await LoadAccountData_remote(username, password);
  } else {
    return await LoadAccountData_local(username, password);
  }
}

/**
 * check if the username or email is exist
 * @param {*} username
 * @param {*} email
 * @returns String
 */
export async function CheckAccountExist(username, email) {
  if (getIsRemote()) {
    return await CheckAccountExist_remote(username, email);
  } else {
    return await CheckAccountExist_local(username, email);
  }
}

/**
 * Check if the value is exist
 * @param {*} currentAccountID
 * @param {*} key
 * @param {*} value
 * @returns
 */
export async function CheckAccountUnique(currentAccountID, username, email) {
  if (getIsRemote()) {
    return await CheckAccountUnique_remote(currentAccountID, username, email);
  } else {
    return await CheckAccountUnique_local(currentAccountID, username, email);
  }
}
