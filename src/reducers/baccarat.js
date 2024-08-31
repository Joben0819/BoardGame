import { createSlice } from '@reduxjs/toolkit';
import { bettingTypes } from '../app/components/Game/Baccarat/components/BettingSection/data';
import { chips } from '../app/components/Game/Baccarat/components/ChipSection/data';

export const initialState = {
  chipsPerContainers: {},
  othersChipsPerContainers: {},
  initialChipsPerContainer: {},
  revealCards: false,
  cardsResult: {},
  selectedChips: chips.slice(0, 6),
  bettingAreas: bettingTypes,
  hasBet: false,
};

const baccaratSlice = createSlice({
  name: 'baccarat',
  initialState,
  reducers: {
    resetBaccaratState: (state) => {
      return initialState;
    },
    resetContainers: (state) => {
      state.chipsPerContainers = state.initialChipsPerContainer;
      state.othersChipsPerContainers = state.initialChipsPerContainer;
    },
    setInitialChipsPerContainer: (state, action) => {
      state.initialChipsPerContainer = { ...action.payload };
    },
    setChipsPerContainers: (state, action) => {
      state.chipsPerContainers = { ...action.payload };
    },
    storeChips: (state, action) => {
      state.chipsPerContainers = {
        ...state.chipsPerContainers,
        ...action.payload,
      };
    },
    setOthersChipsPerContainers: (state, action) => {
      state.othersChipsPerContainers = { ...action.payload };
    },
    storeOthersChips: (state, action) => {
      const { bet_select, chip } = action.payload;
      const container = state.othersChipsPerContainers[bet_select];
      if (container) {
        container.chips.push(chip);
        container.totalAmount += chip.value;
      } else {
        state.othersChipsPerContainers[bet_select] = {
          chips: [chip],
          totalAmount: chip.value,
        };
      }
    },
    setCardsResult: (state, action) => {
      state.cardsResult = action.payload;
    },
    setRevealCards: (state, action) => {
      state.revealCards = action.payload;
    },
    setSelectedChips: (state, action) => {
      state.selectedChips = action.payload.length
        ? action.payload.sort((a, b) => a.value - b.value)
        : state.selectedChips;
    },
    setBettingAreas: (state, action) => {
      state.bettingAreas = action.payload;
    },
    setHasBet: (state, action) => {
      state.hasBet = action.payload;
    },
  },
});

export const {
  resetBaccaratState,
  resetContainers,
  storeOthersChips,
  setOthersChipsPerContainers,
  storeChips,
  setCardsResult,
  setRevealCards,
  setSelectedChips,
  setBettingAreas,
  setChipsPerContainers,
  setInitialChipsPerContainer,
  setHasBet,
} = baccaratSlice.actions;

export default baccaratSlice.reducer;
