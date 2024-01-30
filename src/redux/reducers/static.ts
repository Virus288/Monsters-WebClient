import { createSlice } from '@reduxjs/toolkit';
import type * as types from '../types';

const statics = createSlice({
  name: 'statics',
  initialState: { settings: false, help: false } as types.IStaticState,
  reducers: {
    openSettings(state) {
      state.settings = true;
      return state;
    },
    closeSettings(state) {
      state.settings = false;
      return state;
    },
    openHelpPanel(state) {
      state.help = true;
      return state;
    },
    closeHelpPanel(state) {
      state.help = false;
      return state;
    },
  },
});

export const { openSettings, closeSettings, closeHelpPanel, openHelpPanel } = statics.actions;
export default statics.reducer;
