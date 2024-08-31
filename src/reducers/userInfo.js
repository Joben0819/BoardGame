import { createSlice } from "@reduxjs/toolkit";
import {
  getAccountNow,
  boxAccount,
  getFundDetails,
} from "../api/game/gamelist";

export const initialState = {
  userBalance: 0,
  Intransfer: 0,
  DataBal: [],
  userData: {},
  mails: [],
  selectedBindCard: {},
  ipAddress: null,
  boxPassIsSet: false,
  withdrawPassIsSet: false,
};

const userSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    resetUserInfoState: () => {
      return initialState;
    },
    setUserBalance: (state, action) => {
      state.userBalance = action.payload;
    },
    setUserTransfer: (state, action) => {
      state.Intransfer = action.payload;
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setDataBal: (state, action) => {
      state.DataBal = action.payload;
    },
    setMails: (state, action) => {
      state.mails = action.payload;
    },
    setSelectedBindCard: (state, action) => {
      state.selectedBindCard = action.payload;
    },
    setIpAddress: (state, action) => {
      state.ipAddress = action.payload;
    },
    setBoxPassIsSet: (state, action) => {
      state.boxPassIsSet = action.payload;
    },
    setWithdrawPassIsSet: (state, action) => {
      state.withdrawPassIsSet = action.payload;
    },
  },
});

export const {
  resetUserInfoState,
  setUserBalance,
  setUserData,
  setMails,
  setSelectedBindCard,
  setUserTransfer,
  setDataBal,
  setIpAddress,
  setBoxPassIsSet,
  setWithdrawPassIsSet,
} = userSlice.actions;

export default userSlice.reducer;

export const updateBalance = () => async (dispatch) => {
  // console.log('@@@inside updatebalance reduer')
  try {
    getAccountNow().then((res) => {
      if (res.data.code === 200) {
        dispatch(setUserBalance(res.data.data.balance));
      } else {
        dispatch(setUserBalance(0));
      }
    });
  } catch (error) {}
};

export const TransferBalance = () => async (dispatch) => {
  try {
    boxAccount(sessionStorage.getItem("pass")).then((res) => {
      if (res.data.code === 200) {
        dispatch(setUserTransfer(res.data.data.boxAccount));
      } else {
        dispatch(setUserTransfer(0));
      }
    });
  } catch (error) {}
};

export const DataBalance = () => async (dispatch) => {
  try {
    getFundDetails("SAFE_BOX", "today").then((res) => {
      if (res.data.code === 200) {
        dispatch(setDataBal(res.data.data));
        // console.warn(res)
      } else {
        dispatch(setDataBal(0));
      }
    });
  } catch (error) {}
};
