import { createSlice } from '@reduxjs/toolkit';
import type * as types from '../types';

const statics = createSlice({
  name: 'statics',
  initialState: { settings: false, help: false, account: false } as types.IStaticState,
  reducers: {
    openSettingsPanel(state) {
      state.settings = true;
      return state;
    },
    closeSettingsPanel(state) {
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
    openAccountPanel(state) {
      state.account = true;
      return state;
    },
    closeAccountPanel(state) {
      state.account = false;
      return state;
    },
  },
});

export const {
  openSettingsPanel,
  closeSettingsPanel,
  closeHelpPanel,
  openHelpPanel,
  closeAccountPanel,
  openAccountPanel,
} = statics.actions;
export default statics.reducer;
