import { configureStore } from '@reduxjs/toolkit';
import account from './reducers/account';
import statics from './reducers/static';
import websocket from './reducers/websocket';

const mainStore = configureStore({
  reducer: {
    account,
    statics,
    websocket,
  },
});

export default mainStore;
