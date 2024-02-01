import { createSlice } from '@reduxjs/toolkit';
import type * as types from '../types';

const websocket = createSlice({
  name: 'websocket',
  initialState: { connected: false } as types.IWebsocketState,
  reducers: {
    connectWebsocket(state) {
      state.connected = true;
      return state;
    },
    disconnectWebsocket(state) {
      state.connected = false;
      return state;
    },
  },
});

export const { connectWebsocket, disconnectWebsocket } = websocket.actions;
export default websocket.reducer;
