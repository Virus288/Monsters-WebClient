import { configureStore } from '@reduxjs/toolkit';
import account from './reducers/account';
import profile from './reducers/profile';
import statics from './reducers/static';
import messages from './reducers/messages';
import websocket from './reducers/websocket';
import logs from './reducers/logs';

const mainStore = configureStore({
  reducer: {
    account,
    profile,
    statics,
    messages,
    websocket,
    logs,
  },
});

export default mainStore;
