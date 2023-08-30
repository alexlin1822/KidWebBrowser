import { getIsRemote } from "./Common";

import {
  SaveNewData_remote,
  SaveUpdateData_remote,
  deleteData_remote,
  LoadData_remote,
  LoadAccountData_remote,
  CheckAccountExist_remote,
} from "./RemoteStore";

import {
  SaveNewData_local,
  SaveUpdateData_local,
  deleteData_local,
  LoadData_local,
  LoadAccountData_local,
  CheckAccountExist_local,
} from "./LocalStore";

export async function SaveNewData(type, storage_keyname, content) {
  if (getIsRemote()) {
    return await SaveNewData_remote(type, storage_keyname, content);
  } else {
    return await SaveNewData_local(type, storage_keyname, content);
  }
}

export async function SaveUpdateData(type, storage_keyname, content) {
  if (getIsRemote()) {
    return await SaveUpdateData_remote(type, storage_keyname, content);
  } else {
    return await SaveUpdateData_local(type, storage_keyname, content);
  }
}

export async function deleteData(type, storage_keyname, content) {
  if (getIsRemote()) {
    return await deleteData_remote(type, storage_keyname, content);
  } else {
    return await deleteData_local(type, storage_keyname, content);
  }
}

export async function CheckAccountExist(username, email) {
  if (getIsRemote()) {
    return await CheckAccountExist_remote(username, email);
  } else {
    return await CheckAccountExist_local(username, email);
  }
}

export async function LoadAccountData(username, password) {
  if (getIsRemote()) {
    return await LoadAccountData_remote(username, password);
  } else {
    return await LoadAccountData_local(username, password);
  }
}

// export async function LoadData(datatype, storage_keyname) {
//   if (getIsRemote()) {
//     return await LoadData_remote(datatype, storage_keyname);
//   } else {
//     return await LoadData_local(datatype, storage_keyname);
//   }
// }

export async function LoadData(datatype, storage_keyname) {
  if (getIsRemote()) {
    return await LoadData_remote(datatype, storage_keyname);
  } else {
    return await LoadData_local(datatype, storage_keyname);
  }
}
