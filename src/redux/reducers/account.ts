import { createSlice } from '@reduxjs/toolkit';
import type * as types from '../types';

const account = createSlice({
  name: 'account',
  initialState: { userName: undefined } as types.IAccountState,
  reducers: {
    logIn(state, action: types.IAccountAction) {
      state.userName = action.payload.userName;
      state.id = action.payload.id;
      return state;
    },
    logOut(state) {
      state.userName = undefined;
      return state;
    },
  },
});

export const { logIn, logOut } = account.actions;
export default account.reducer;
