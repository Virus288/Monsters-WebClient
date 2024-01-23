import { configureStore } from '@reduxjs/toolkit';
import account from './reducers/account';
import statics from './reducers/static';
import logs from './reducers/logs';
import websocket from './reducers/websocket';

const mainStore = configureStore({
  reducer: {
    account,
    statics,
    websocket,
    logs,
  },
});

export default mainStore;
