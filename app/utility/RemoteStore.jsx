import { GetStorageKey, GenerateNewId } from "./Common";

/* Remote Storage */

/**
 * Save new data to Storage
 * @param {*} type      accounts, members, resources, account_profile, member_profile
 * @param {*} storage_keyname   always use GetStorageKey()
 * @param {*} content   JSON String
 * @returns  true or false
 */
export async function SaveNewData_remote(type, storage_keyname, content) {}

/**
 * Update data to Storage
 * @param {*} type      accounts, members, resources, account_profile, member_profile
 * @param {*} storage_keyname   always use GetStorageKey()
 * @param {*} content   JSON String
 * @returns  true or false
 */
export async function SaveUpdateData_remote(type, storage_keyname, content) {}

/**
 * Delete data from Storage (set the status ="-1")
 * @param {*} type        accounts, members, resources, account_profile, member_profile
 * @param {*} storage_keyname   always use GetStorageKey()
 * @returns true or false
 */
export async function deleteData_remote(type, storage_keyname) {
  let result = false;
  return result;
}

/**
 * Load data from Storage
 * @param {*} datatype    accounts, members, resources, account_profile, member_profile
 * @param {*} storage_keyname  always use GetStorageKey()
 * @param {*} keyToDelete  if keyToDelete is not null, then delete the key after load
 * @returns String
 */
export async function LoadData_remote(datatype, storage_keyname, keyToDelete) {}

/**
 * Get account id by username and password
 * @param {*} username :string
 * @param {*} password :string
 * @returns : string
 */
export async function LoadAccountData_remote(username, password) {}

/**
 * check if the username or email is exist
 * @param {*} username
 * @param {*} email
 * @returns String
 */
export async function CheckAccountExist_remote(username, email) {}

/**
 * Check if the value is exist
 * @param {*} currentAccountID
 * @param {*} key
 * @param {*} value
 * @returns
 */
export async function CheckAccountUnique_remote(
  currentAccountID,
  username,
  email
) {
  return "";
}
