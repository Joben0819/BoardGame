import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  sideBar: [],
  activeSideBarItem: {},
  announceText: '',
  domainName: '',
  platForm: {},
  showPlatFormData: false,
  PlatFormData: {},
  gameHG: false,
  homeNotices: [],
};

const gameDataSlice = createSlice({
  name: 'gameData',
  initialState,
  reducers: {
    resetGameDataState: () => initialState,
    setSideBar: (state, action) => {
      state.sideBar = action.payload;
    },
    setActiveSideBarItem: (state, action) => {
      state.activeSideBarItem = action.payload;
    },
    setAnnounceText: (state, action) => {
      state.announceText = action.payload;
    },
    setDomainName: (state, action) => {
      state.domainName = action.payload;
    },
    setPlatForm: (state, action) => {
      state.platForm = action.payload;
    },
    setshowPlatFormData: (state, action) => {
      state.showPlatFormData = action.payload;
    },
    setPlatFormData: (state, action) => {
      state.PlatFormData = action.payload;
    },
    setgameHG: (state, action) => {
      state.gameHG = action.payload;
    },
    setHomeNotices: (state, action) => {
      state.homeNotices = action.payload;
    },
  },
});

export const {
  resetGameDataState,
  setSideBar,
  setActiveSideBarItem,
  setAnnounceText,
  setDomainName,
  setPlatForm,
  setshowPlatFormData,
  setPlatFormData,
  setgameHG,
  setHomeNotices,
} = gameDataSlice.actions;

export default gameDataSlice.reducer;
