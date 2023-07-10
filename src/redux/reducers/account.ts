import { createSlice } from '@reduxjs/toolkit';
import type * as types from '../types';

const account = createSlice({
  name: 'account',
  initialState: { logged: false } as types.IAccountState,
  reducers: {
    updateLocked(state, action: types.IAccountAction) {
      state.logged = Boolean(action.payload.logged);
      return state;
    },
  },
});

export const { updateLocked } = account.actions;
export default account.reducer;
