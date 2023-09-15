import { configureStore } from '@reduxjs/toolkit';
import account from '../redux/reducers/account';
import statics from '../redux/reducers/static';

const mainStore = configureStore({
  reducer: {
    account,
    statics,
  },
});

export default mainStore;
