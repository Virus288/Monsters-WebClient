import { createSlice } from '@reduxjs/toolkit';
import type * as types from '../types';

const websocket = createSlice({
  name: 'websocket',
  initialState: { connected: false, messages: [], actions: [] } as types.IWebsocketState,
  reducers: {
    addMessage(state, action: types.INewMessageAction) {
      state.messages.push(action.payload.messages);
      return state;
    },
    connect(state) {
      state.connected = true;
      return state;
    },
    disconnect(state) {
      state.connected = false;
      return state;
    },
    addAction(state, action: types.ISocketAction) {
      state.actions.push({ target: action.payload.action, payload: action.payload.payload });
      return state;
    },
    removeAction(state, action: types.ISocketAction) {
      state.actions = state.actions.filter((a) => a.target !== action.payload.action);
      return state;
    },
  },
});

export const { addMessage, connect, disconnect, addAction, removeAction } = websocket.actions;
export default websocket.reducer;
