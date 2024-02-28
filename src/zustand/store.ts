import { create } from 'zustand';
import { isError, useQuery } from 'react-query';
import zukeeper from 'zukeeper';
import type * as types from './types';
import Cookies from '../tools/cookies';
import { loginUser } from '../controllers';

const accessToken = new Cookies().getToken('monsters.uid');

export const useAccountStore = create<types.IAccountStore>((set) => ({

  isLoggedIn: false,
  account: undefined,
  setAccount: (user): void => set({ account: user }),

  setIsLoggedIn: (bol): void => set({ isLoggedIn: bol }),
}));

export const useLogsStore = create((set) => ({
  logs: [],
  setLogs: (logs) => {
    set({ logs });
  },
}));
export const useProfileStore = create<types.ProfileStore>((set) => ({
  profile: undefined,
  setProfile: (profile) => {
    set({ profile });
  },
}));

export const useStaticsStore = create(() => ({
  statics: [],
}));

export const useMessagesStore = create(() => ({
  messages: [],
}));

export const useWebsocketStore = create(() => ({
  websocket: null,
}));

export const useHistoryStore = create(() => ({
  history: ['start'],
}));
