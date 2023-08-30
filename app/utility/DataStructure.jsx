/**
 * @fileoverview This file contains the data structure of the account list,
 *               account profile, and resource profile.
 *
 */

/**
 * Add a new account object
 * @param {*} accountID
 * @param {*} text_nickname
 * @param {*} text_username
 * @param {*} text_email
 * @param {*} text_password
 * @returns Dictionary
 */
export function AddNewAccount(
  accountID,
  text_nickname,
  text_username,
  text_email,
  text_password
) {
  const myAccount = {
    accountID: accountID,
    nickname: text_nickname,
    username: text_username,
    email: text_email,
    password: text_password,
    status: "0",
  };
  return myAccount;
}

/**
 * Account profile object
 * @param {*} accountID
 * @param {*} text_nickname
 * @param {*} text_email
 * @returns String
 */
export function InitAccountProfile(accountID, text_nickname, text_email) {
  //db:kwb
  //collection: members
  console.log("InitAccountProfile");
  const myAccountProfile = {
    owner: accountID,
    nickname: text_nickname,
    email: text_email,
    profile: {
      setting1: "aa",
      setting2: "bb",
    },
    memberlist: [
      {
        key: "0",
        title: "Add Person",
        description: "Add your kid or family member",
        icon: "https://alexlin1822.github.io/aimage/0.png",
        memo: "",
        status: "0",
      },
      // {...}
    ],
  };
  return JSON.stringify(myAccountProfile);
}

// #### Resource profile object ####

export function InitResourceProfile(memberID) {
  //db:kwb
  //collection: resources
  console.log("InitResourceProfile");
  const myResourceProfile = {
    owner: memberID,
    resourcelist: [
      {
        rid: "0",
        title: "Add resource",
        description: "Add resource",
        default_url: "https://www.google.com/",
        icon: "https://www.google.com/favicon.ico",
        memo: "",
        status: "0",
        url_include: "",
        title_include: "",
        whitelist: "",
        use_url_include: true,
        use_title_include: false,
        use_whitelist: false,
        last_url: "https://www.google.com/",
        time_limit: "30",
      },
      // {...}
    ],
  };
  return JSON.stringify(myResourceProfile);
}
