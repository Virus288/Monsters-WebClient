import { configureStore } from '@reduxjs/toolkit';
import account from './reducers/account';
import profile from './reducers/profile';
import statics from './reducers/static';
import logs from './reducers/logs';

const mainStore = configureStore({
  reducer: {
    account,
    profile,
    statics,
    logs,
  },
});

export default mainStore;
