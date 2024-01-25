import { createSlice } from '@reduxjs/toolkit';
import type * as types from '../types';

const profile = createSlice({
  name: 'profile',
  initialState: { profile: {} } as types.IProfileState,
  reducers: {
    addProfile(state, action: types.IAddProfileAction) {
      state.profile = action.payload;
      return state;
    },
  },
});

export const { addProfile } = profile.actions;
export default profile.reducer;
