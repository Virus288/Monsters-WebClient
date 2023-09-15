import { createSlice } from '@reduxjs/toolkit';
import type * as types from '../types';

const statics = createSlice({
  name: 'statics',
  initialState: { settings: false } as types.IStaticState,
  reducers: {
    openSettings(state) {
      state.settings = true;
      return state;
    },
    closeSettings(state) {
      state.settings = false;
      return state;
    },
  },
});

export const { openSettings, closeSettings } = statics.actions;
export default statics.reducer;
