import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  gameVolume: 100,
  baccaratChipSound: true,
  showLoginModal: false,
  showFeedbackModal: false,
  showAnnouncementModal: false,
  showSettings: false,
  showQuitDialog: false,
  showPleaseRotate: false,
  showOtherModalComp: false,
  showWithdrawSuccessModal: false,
  showBindWithdrawModal: false,
  showVersionModal: false,
  Switch: false,
  currTheme: "blackGold",
};

const gameSettingSlice = createSlice({
  name: "gameSettings",
  initialState,
  reducers: {
    resetGameSettingState: (state) => {
      state = {
        gameVolume: 100,
      };
    },
    setGameVolume: (state, action) => {
      state.gameVolume = action.payload;
    },
    setBaccaratChipSound: (state, action) => {
      state.baccaratChipSound = action.payload;
    },
    setShowLoginModal: (state, action) => {
      state.showLoginModal = action.payload;
    },
    setShowFeedbackModal: (state, action) => {
      state.showFeedbackModal = action.payload;
    },
    setCurrTheme: (state, action) => {
      state.currTheme = action.payload;
    },
    setShowAnnouncementModal: (state, action) => {
      state.showAnnouncementModal = action.payload;
    },
    setShowSettings: (state, action) => {
      state.showSettings = action.payload;
    },
    setShowQuitDialog: (state, action) => {
      state.showQuitDialog = action.payload;
    },
    setShowPleaseRotate: (state, action) => {
      state.showPleaseRotate = action.payload;
    },
    setShowOtherModalComp: (state, action) => {
      state.showOtherModalComp = action.payload;
    },
    setShowWithdrawSuccessModal: (state, action) => {
      state.showWithdrawSuccessModal = action.payload;
    },
    setShowBindWithdrawModal: (state, action) => {
      state.showBindWithdrawModal = action.payload;
    },
    setShowVersionModal: (state, action) => {
      state.showVersionModal = action.payload;
    },
    setSwitch: (state, action) => {
      state.Switch = action.payload;
    },
  },
});

export const {
  resetGameSettingState,
  setGameVolume,
  setShowLoginModal,
  setBaccaratChipSound,
  setShowFeedbackModal,
  setCurrTheme,
  setShowAnnouncementModal,
  setShowSettings,
  setShowQuitDialog,
  setShowPleaseRotate,
  setShowOtherModalComp,
  setShowWithdrawSuccessModal,
  setShowBindWithdrawModal,
  setShowVersionModal,
  setSwitch,
} = gameSettingSlice.actions;

export default gameSettingSlice.reducer;
