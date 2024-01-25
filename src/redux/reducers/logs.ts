import { createSlice } from '@reduxjs/toolkit';
import type * as types from '../types';

const logs = createSlice({
  name: 'logs',
  initialState: { logs: [] } as types.ILogsState,
  reducers: {
    addLog(state, action: types.IAddLogAction) {
      state.logs.push({ log: action.payload.message, author: action.payload.author });
      return state;
    },
  },
});

export const { addLog } = logs.actions;
export default logs.reducer;
