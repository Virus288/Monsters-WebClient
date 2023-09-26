import { configureStore } from '@reduxjs/toolkit';
import account from '../redux/reducers/account';
import statics from '../redux/reducers/static';
import websocket from '../redux/reducers/websocket';

const mainStore = configureStore({
  reducer: {
    account,
    statics,
    websocket,
  },
});

export default mainStore;
