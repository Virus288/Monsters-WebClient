import { createSlice } from '@reduxjs/toolkit';
import type * as types from '../types';

const messages = createSlice({
  name: 'messages',
  initialState: { chats: [], details: [] } as types.IMessagesState,
  reducers: {
    addMessages(state, action: types.IAddMessagesAction) {
      const detailsIds = state.details.map((d) => d._id);

      action.payload.details
        .filter((m) => !detailsIds.includes(m._id))
        .forEach((m) => {
          state.details.push(m);
        });
      return state;
    },
    addChats(state, action: types.IAddChatsAction) {
      const ids = state.chats.map((e) => e.chatId);
      Object.entries(action.payload.chats).forEach(([k, v]) => {
        if (!ids.includes(k)) {
          state.chats.push({ ...v, chatId: k });
        }
      });
      return state;
    },
  },
});

export const { addMessages, addChats } = messages.actions;
export default messages.reducer;
