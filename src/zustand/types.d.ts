import type * as types from '../types';

export type ProfileStore = {
  profile: types.IUserProfile | undefined;
  setProfile: (profile: types.IUserProfile) => void;
};

export type IAccountStore = {
  isLoggedIn:boolean;
  account: types.IUser | undefined;
  setAccount: (data: types.IUser) => void;
  setIsLoggedIn:(data:boolean)=>void
};
