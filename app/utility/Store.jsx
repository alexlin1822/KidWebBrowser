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

export async function SaveNewData(keyname, content) {
  if (getIsRemote()) {
    return await SaveNewData_remote(keyname, content);
  } else {
    return await SaveNewData_local(keyname, content);
  }
}

export async function SaveUpdateData(keyname, content) {
  if (getIsRemote()) {
    return await SaveUpdateData_remote(keyname, content);
  } else {
    return await SaveUpdateData_local(keyname, content);
  }
}

export async function deleteData(keyname, content) {
  if (getIsRemote()) {
    return await deleteData_remote(keyname, content);
  } else {
    return await deleteData_local(keyname, content);
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

export async function LoadData(datatype, keyname) {
  if (getIsRemote()) {
    return await LoadData_remote(datatype, keyname);
  } else {
    return await LoadData_local(datatype, keyname);
  }
}
