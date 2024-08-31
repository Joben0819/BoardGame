import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  volume: 0.5,
  isPlaying: false,
};

export const VolumeReducer = createSlice({
  name: 'volume',
  initialState,
  reducers: {
    setVolume: (state, action) => {
      state.volume = action.payload;
      console.log('New volume:', state.volume);
    },
    setIsPlaying: (state, action) => {
      state.isPlaying = action.payload;
    },
  },
});

export const { setVolume, setIsPlaying } = VolumeReducer.actions;

export const selectVolume = (state) => state.volume.volume;

export default VolumeReducer.reducer;