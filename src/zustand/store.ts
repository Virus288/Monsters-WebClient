import { create } from 'zustand';
import type * as types from './types';

export const useAccountStore = create<types.IAccountStore>((set) => ({
  isLoggedIn: false,
  account: undefined,
  setAccount: (user): void => set({ account: user }),

  setIsLoggedIn: (bol): void => set({ isLoggedIn: bol }),
}));

export const useLogsStore = create((set) => ({
  logs: [],
  setLogs: (logs: string[]): void => {
    set({ logs });
  },
}));
export const useProfileStore = create<types.ProfileStore>((set) => ({
  profile: undefined,
  setProfile: (profile): void => {
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
