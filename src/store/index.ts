import { configureStore } from '@reduxjs/toolkit';
import account from '../redux/reducers/account';

const mainStore = configureStore({
  reducer: {
    account,
  },
});

export default mainStore;
