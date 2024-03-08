import type * as types from '../types';
import type { ILog, IPreparedMessagesBody } from '../types';

export type ProfileStore = {
  profile: types.IUserProfile | undefined;
  setProfile: (profile: types.IUserProfile) => void;
};

export type IAccountStore = {
  isLoggedIn: boolean;
  account: types.IUser | undefined;
  setAccount: (data: types.IUser) => void;
  setIsLoggedIn: (data: boolean) => void;
};

export type IHistoryStore = {
  history: string[];
  addToHistory: (output: string) => void;
};

export type ILogsStore = {
  logs: ILog[];
  setLogs: (logs: ILog[]) => void;
};

export type IMessagesStore = {
  messages: Record<string, IPreparedMessagesBody>;
  addMessages: (messages: Record<string, IPreparedMessagesBody>) => void;
};
