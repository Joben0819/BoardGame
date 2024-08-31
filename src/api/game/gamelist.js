import Request2 from "../Request2";
import { JSEncrypt } from "jsencrypt";
import {
  DOMAIN_REQUEST_PRIVATE_KEY,
  REQUESTS_PRIVATE_KEY,
  REQUESTS_PUBLIC_KEY,
} from "src/Key";
// import {
//   defaultUrl,
//   url0,
//   url1,
//   url2,
//   url3,
//   url4,
//   variant,
// } from "src/variants/8801/server";
const {
  DOMAIN,
  AGENT,
  url0,
  url1,
  url2,
  url3,
  url4,
} = require("../../server/" + process.env.REACT_APP_SITE);
//////////////Params////////////

var gameapp = "/game88-game-app/";
var payapp = "/game88-pay-app/";
var platform = "/game88-platform-app/";
var lotteryapp = "/game88-lottery-app/";
var browse_ns = "/browse-ns/app/";

//////////////Domain////////////

const encryptPayload = (rawData) => {
  var encrypt = new JSEncrypt();
  encrypt.setPublicKey(REQUESTS_PUBLIC_KEY);
  return encrypt.encrypt(rawData);
};

const decryptResponse = (encrypted) => {
  var decrypt = new JSEncrypt();
  decrypt.setPrivateKey(REQUESTS_PRIVATE_KEY);
  return decrypt.decrypt(encrypted);
};

const decryptDomain = (encrypted) => {
  var decrypt = new JSEncrypt();
  decrypt.setPrivateKey(DOMAIN_REQUEST_PRIVATE_KEY);
  return decrypt.decrypt(encrypted);
};

var ServerDomain;
if (localStorage.getItem("domain") === "hasDomain") {
  ServerDomain = JSON.parse(
    decryptDomain(localStorage.getItem(localStorage.getItem("currDomain")))
  )?.yuming;
}

const urls = [url0, url1, url2, url3, url4];
let urlsResponse = [];

export const requestUrls = async () => {
  //Default URL
  ServerDomain = DOMAIN;
  localStorage.setItem("domain", "hasDomain");
  // if (VARIANT === "8801") {
  //   ServerDomain = DOMAIN;
  //   localStorage.setItem("domain", "hasDomain");
  // }
  // if (VARIANT === "8802") {
  //   ServerDomain = DOMAIN;
  //   localStorage.setItem("domain", "hasDomain");
  // }

  const getEncryptedData = async (url, index) => {
    try {
      const response = await fetch(url, { mode: "no-cors" });
      const data = await response.text();
      urlsResponse.push(data);
      if (urlsResponse?.length > 0) {
        ServerDomain = JSON.parse(decryptDomain(urlsResponse[0]?.toString()));
        localStorage.setItem("domain", "hasDomain");
        localStorage.setItem("currDomain", "domainNum" + index);
        localStorage.setItem("domainNum" + index, data);
        sessionStorage.setItem("domainUrl", data);
      }
    } catch (error) {}
  };

  urls.map(async (url, index) => {
    localStorage.getItem("domain") !== "hasDomain" &&
      getEncryptedData(url, index);

    if (
      index === urls?.length - 1 &&
      localStorage.getItem("domain") === "hasDomain"
    ) {
      return true;
    } else {
      return false;
    }
  });
};

requestUrls();

var Post = "post";

export function SectionGames(section, pid) {
  var data = { id: section, pid: pid };
  return DataRequest(gameapp, "getGameInfos", Post, data);
}
export function getGameInfoList(id) {
  var data = { id: id };
  return DataRequest(gameapp, "getGameInfoList", Post, data);
}
export function getGameInfoGroup(id) {
  var data = { id: id };
  return DataRequest(gameapp, "getGameInfoGroup", Post, data);
}

export function cleanWashCode() {
  return DataRequest(gameapp, "cleanCodeDetail", Post);
}

export function Register({
  mobile,
  pass,
  data,
  inviterCode,
  deviceModel,
  ip,
  machineId,
}) {
  var data = {
    mobile: mobile,
    code: data,
    passwd: pass,
    inviterCode: inviterCode ? inviterCode : "1001",
    deviceId: machineId,
    ip: ip,
    phoneModel: deviceModel,
  };
  return DataRequest(platform, "register", Post, data);
}

export function Register_username({
  mobile,
  pass,
  confirm,
  data,
  inviterCode,
  deviceModel,
  ip,
  machineId,
}) {
  var data = {
    mobile: null,
    username: mobile,
    code: null,
    passwd: pass,
    inviterCode: inviterCode ? inviterCode : "1001",
    confirmPass: confirm,
    deviceId: machineId,
    ip: ip,
    phoneModel: deviceModel,
  };
  return DataRequest(platform, "usernameRegister", Post, data);
}

export function Gamelist() {
  return DataRequest(gameapp, "getGameTypes", Post);
}
export function toWashCode() {
  return DataRequest(gameapp, "toWashCode", Post);
}
export function getWashCodeLogs() {
  var data = {
    pageNum: 1,
    pageSize: 10,
  };
  return DataRequest(gameapp, "getWashCodeLogs", Post, data);
}
export function getWashCodeRateList() {
  return DataRequest(gameapp, "getWashCodeRateList", Post);
}
export function getWashCodeDetail() {
  return DataRequest(gameapp, "getWashCodeDetail", Post);
}
export function SMS(cell) {
  var data = { phone: cell };
  return DataRequest(platform, "sendSmsVerifyCode", Post, data);
}

export function escGame(val) {
  var data = { id: val };
  return DataRequest(gameapp, "escGame", Post, data);
}

export function getAccountInfo() {
  return DataRequest(platform, "getAccountInfo", Post);
}

export function vipGiftInfo() {
  return DataRequest(platform, "getVipGiftInfo", Post);
}

//Modal requests
export function getActivityInfos(idParam) {
  var data = { id: idParam };
  return DataRequest(platform, "getActivityInfos", Post, data);
}

export function getActivityQuestInfos(idParam) {
  var data = { id: idParam };
  return DataRequest(platform, "getActivityQuestInfos", Post, data);
}

export function getActivityTypes() {
  var data = { id: 2 };
  return DataRequest(platform, "getActivityTypes", Post, data);
}

export function getActivityQuestTypes() {
  var data = { id: 2 };
  return DataRequest(platform, "getActivityQuestTypes", Post, data);
}
export function receiveQuestReward(questId) {
  var data = { id: questId };
  return DataRequest(platform, "receiveQuestReward", Post, data);
}

export function getMessageHomeNotices() {
  var data = { id: 2 };
  return DataRequest(platform, "getMessageHomeNotices", Post, data);
}

export function userReceivedMessage() {
  return DataRequest(platform, "getMessageOnSites", Post);
}

//Member related Interface
export function receiveVipGift(type) {
  var data = { type: type };
  return DataRequest(platform, "receiveVipGift", Post, data);
}
export function getTradeTypes() {
  return DataRequest(platform, "getTradeTypes", Post);
}
export function getImToken() {
  return DataRequest(platform, "getImToken", Post);
}

export function getFundDetails(enumMoney, enumReqTime, pageNum) {
  var data = {
    pageNum,
    pageSize: 50,
    enumMoney: enumMoney,
    enumReqTime: enumReqTime,
  };
  return DataRequest(platform, "getFundDetails", Post, data);
}

export function getCodeFlowList() {
  var data = { pageNum: 1, pageSize: 10 };
  return DataRequest(platform, "getCodeFlowList", Post, data);
}

//vip section parts
export async function getGameDataList(gameCategory, reqTime) {
  var data = {
    pageNum: 1,
    pageSize: 10,
    gameCategory: gameCategory,
    enumReqTime: reqTime,
  };

  return (await DataRequest(gameapp, "getGameDataList", Post, data)).data;
}

export async function getGameCategoryList() {
  return (await DataRequest(gameapp, "getGameCategoryList", Post)).data;
}

export function getGameBalance() {
  return DataRequest(gameapp, "getGameBalance", Post);
}

export function gameWithdrawal(platId) {
  var data = { id: platId };
  return DataRequest(gameapp, "gameWithdrawal", Post, data);
}
//Promotion
export function getRecommendDesc(code) {
  return DataRequest(platform, "getRecommendDesc", Post);
}

export function getRecommendRewardDetailList() {
  var data = { pageNum: 1, pageSize: 10 };
  return DataRequest(platform, "getRecommendRewardDetailList", Post, data);
}

export function getRecommendDetailList(code, pageNum) {
  var data = { pageNum, pageSize: 50, code: code };
  return DataRequest(platform, "getRecommendDetailList", Post, data);
}

export function getAccountNow() {
  return DataRequest(platform, "getAccountNow", Post);
}

//SafeBox Related
export function boxPassIsOpen() {
  return DataRequest(platform, "boxPassIsOpen", Post);
}

export function boxPassSet(num) {
  var data = {
    boxPass: num,
  };
  return DataRequest(platform, "boxPassSet", Post, data);
}

export function boxAccount(num) {
  var data = {
    boxPass: num,
  };
  return DataRequest(platform, "boxAccount", Post, data);
}

export function withdrawPassIsOpen() {
  return DataRequest(payapp, "withdrawPassIsOpen", Post);
}

export function withdrawPassSet(num) {
  var data = {
    boxPass: num,
  };
  return DataRequest(payapp, "withdrawPassSet", Post, data);
}

export function getRecommendDetail(boxPass) {
  var data = { boxPass: boxPass };
  return DataRequest(platform, "getRecommendDetail", Post, data);
}

export function getMessageCommonProblems() {
  return DataRequest(platform, "getMessageCommonProblems", Post);
}

//Promotional Related api
export function receiveRecommendReward() {
  return DataRequest(platform, "receiveRecommendReward", Post);
}

// Lottery Game
export function rule(lotteryId) {
  var data = { pageNum: 1, pageSize: 10, id: lotteryId };
  return DataRequest(lotteryapp, "rule", Post, data);
}

export function lotteryInit(lotteryId) {
  var data = {
    pageNum: 1,
    pageSize: 10,
    id: lotteryId,
  };
  return DataRequest(lotteryapp, "lotteryInit", Post, data);
}

export function betRecord(lotteryId) {
  var data = { pageNum: 1, pageSize: 10, id: lotteryId };
  return DataRequest(lotteryapp, "betRecord", Post, data);
}

export function bet(lotteryId, methodId, chip, betId) {
  var data = {
    lotteryId: lotteryId,
    methodId: methodId,
    chip: chip,
    betIds: betId,
    anchor: -1,
  };
  return DataRequest(lotteryapp, "bet", Post, data);
}

export function issueRecord(lotteryId) {
  var data = { pageNum: 1, pageSize: 10, id: lotteryId };
  return DataRequest(lotteryapp, "issueRecord", Post, data);
}

//Member cash withdrawal related interface

export function bankList() {
  return DataRequest(payapp, "bankList", Post);
}

export function payTypeList() {
  return DataRequest(payapp, "payTypeList", Post);
}
export function payChannelList(typeId) {
  var data = {
    typeId: typeId,
  };
  return DataRequest(payapp, "payChannelList", Post, data);
}

export function rechargeBankList() {
  return DataRequest(payapp, "rechargeBankList", Post);
}

export function rechargeUsdtList() {
  return DataRequest(payapp, "rechargeUsdtList", Post);
}

export function rechargeUsdt(data) {
  return DataRequest(payapp, "usdtRecharge", Post, data);
}

export function getBindCardList() {
  return DataRequest(payapp, "getBindCardList", Post);
}

export function setBindCard(realName, bAccount, bAddress, bId) {
  var data = {
    realName: realName,
    bankAccount: bAccount,
    bankAddress: bAddress,
    bankId: bId,
  };
  return DataRequest(payapp, "setBindCard", Post, data);
}

export function bankRecharge(
  rechargeMoney,
  rechargeUserName,
  bankBaseId,
  myIP
) {
  var data = {
    rechargeMoney: rechargeMoney,
    rechargeUserName: rechargeUserName,
    bankBaseId: bankBaseId,
    ip: myIP,
  };
  return DataRequest(payapp, "bankRecharge", Post, data);
}

export function onlineRecharge(channelId, money, myIP) {
  var data = { channelId: channelId, money: money, realIp: myIP };
  return DataRequest(payapp, "onlineRecharge", Post, data);
}

export function vipPayLogin() {
  return DataRequest(payapp, "vipPayLogin", Post);
}

export function vipPayDeposit(amount) {
  var data = { amount: amount };
  return DataRequest(payapp, "vipPayDeposit", Post, data);
}

export function withdrawRechargeDetail(type, pageNum, pageSize) {
  var data = { pageNum: pageNum || 1, pageSize: pageSize || 50, type: type };
  return DataRequest(payapp, "withdrawRechargeDetail", Post, data);
}

export function boxTransfer(addAccount) {
  var data = {
    addAccount: addAccount,
  };
  return DataRequest(platform, "boxTransfer", Post, data);
}

export function Login({ username, password, machineId, ip, validate }) {
  var data = {
    mobile: username,
    passwd: password,
    deviceId: machineId,
    ip: ip,
    ...(validate && { validate: validate }),
  };
  return DataRequest(platform, "login", "post", data);
}

export function Login_username({
  username,
  password,
  machineId,
  ip,
  validate,
}) {
  var data = {
    username: username,
    passwd: password,
    deviceId: machineId,
    ip: ip,
    ...(validate && { validate: validate }),
    mobile: null,
  };
  return DataRequest(platform, "usernameLogin", "post", data);
}
export function loginDevice({
  inviterCode,
  machineId,
  ip,
  deviceModel,
  validate,
}) {
  var data = {
    inviterCode: inviterCode ? inviterCode : "1001",
    deviceId: machineId,
    ip: ip,
    phoneModel: deviceModel,
    ...(validate && { validate: validate }),
  };
  return DataRequest(platform, "loginDevice", "post", data);
}
export function bindPhone(mobile, passwd, code) {
  var data = {
    mobile: mobile,
    passwd: passwd,
    code: code,
  };
  return DataRequest(platform, "bindPhone", "post", data);
}

export function ResetPassword(old, newer) {
  var data = { oldPasswd: old, newPasswd: newer };
  return DataRequest(platform, "resetPasswd", "post", data);
}

export function AccountInfo() {
  return DataRequest(platform, "getAccountInfo", "post");
}

export function BrowseInit() {
  var data = {
    token: `${
      JSON.parse(localStorage.getItem("loginNow"))
        ? JSON.parse(localStorage.getItem("loginNow")).token
        : "adhhjaksdhjk"
    } `,
    id: `${
      JSON.parse(localStorage.getItem("loginNow"))
        ? JSON.parse(localStorage.getItem("loginNow")).token
        : "23"
    } `,
  };
  return DataRequest(platform, "init", Post, data);
}

export function PopCustomerService() {
  return DataRequest(platform, "customerService", Post);
}

export function JoinGame(id) {
  var data = { id: sessionStorage.getItem("id") };
  return DataRequest(gameapp, "joinGame", Post, data);
}

export function cleanCodeLogs() {
  var data = { pageNum: 1, pageSize: 10 };
  return DataRequest(gameapp, "cleanCodeLogs", Post, data);
}

export function withdrawBank(mvalue, mcard, mpass) {
  var data = {
    withdrawMoney: Number(mvalue),
    withdrawalPass: mpass,
    memberCardId: mcard,
  };
  return DataRequest(payapp, "withdrawBank", Post, data);
}

//api called when visit for analytics
export function browseVisit(params) {
  var data = params;
  return DataRequest(browse_ns, "device", Post, data);
}

export function IP() {
  return Request2({
    url: "https://www.taobao.com/help/getip.php?callback=ipCallback",
    method: "get",
    responseType: "json",
  });
}

export function IPBackup() {
  return Request2({
    url: "https://api.ipify.org?format=json",
    method: "get",
    responseType: "json",
  });
}

// ================== TO BE COMMENTED WHEN BACKEND IS READY FOR ENCRYPTED PAYLOADS =================

export function DataRequest(requestType, endPoint, method, data) {
  var globalHeaders = {
    "frond-host": ServerDomain + requestType + endPoint,
    dev: 2,
    agent: AGENT,
    version: process.env.REACT_APP_VERSION,
    token: `${
      JSON.parse(localStorage.getItem("loginNow"))
        ? JSON.parse(localStorage.getItem("loginNow")).token
        : "adhhjaksdhjk"
    } `,
    "Content-Type": "application/json;charset=UTF-8",
  };
  return Request2({
    url: ServerDomain + requestType + endPoint,
    method: method,
    responseType: "json",
    headers: globalHeaders,
    data,
  });
}

// ================== TO BE UNCOMMENTED WHEN BACKEND IS READY FOR ENCRYPTED PAYLOADS =================
//
//
// export function DataRequest(requestType, endPoint, method, data) {
//   const encryptedData = encryptPayload(data);
//   var globalHeaders = {
//     "frond-host": ServerDomain + requestType + endPoint,
//     dev: 2,
//     version: "2.1.29.1",
//     token: `${JSON.parse(localStorage.getItem("loginNow"))
//       ? JSON.parse(localStorage.getItem("loginNow")).token
//       : "adhhjaksdhjk"
//       } `,
//     "Content-Type": "application/json;charset=UTF-8",
//   };
//   return decryptResponse(Request2({
//     url: ServerDomain + requestType + endPoint,
//     method: method,
//     responseType: "json",
//     headers: globalHeaders,
//     encryptedData,
//   }));
// }
