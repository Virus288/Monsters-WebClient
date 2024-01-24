import { configureStore } from '@reduxjs/toolkit';
import account from './reducers/account';
import statics from './reducers/static';
import logs from './reducers/logs';

const mainStore = configureStore({
  reducer: {
    account,
    statics,
    logs,
  },
});

export default mainStore;
