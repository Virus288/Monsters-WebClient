import { create } from 'zustand';
import type * as types from './types';

export const useAccountStore = create<types.IAccountStore>((set) => ({
  isLoggedIn: false,
  account: undefined,
  setAccount: (user): void => set({ account: user }),

  setIsLoggedIn: (bol): void => set({ isLoggedIn: bol }),
}));

export const useLogsStore = create<types.ILogsStore>((set) => ({
  logs: [],
  setLogs: (logs): void => {
    set((state) => ({
      logs: [...state.logs, ...logs],
    }));
  },
}));

export const useProfileStore = create<types.ProfileStore>((set) => ({
  profile: undefined,
  setProfile: (profile): void => {
    set({ profile });
  },
}));

export const useHistoryStore = create<types.IHistoryStore>((set) => ({
  history: [],
  initHistory: (commands): void =>
    set((state) => ({
      history: [...state.history, ...commands],
    })),
  addToHistory: (output): void =>
    set((state) => ({
      history: [...state.history, output],
    })),
  clearHistory: (): void => {
    set(() => ({
      history: [],
    }));
  },
}));

export const useFightsStore = create<types.IFightStore>((set) => ({
  activeFight: undefined,
  fights: [],
  addCurrentFight: (data): void => {
    set(() => ({
      activeFight: data,
    }));
  },
  addFights: (data): void => {
    set(() => ({
      fights: data,
    }));
  },
  removeCurrentFight: (): void => {
    set(() => ({
      activeFight: undefined,
    }));
  },
}));

export const useMessagesStore = create<types.IMessagesStore>((set) => ({
  messages: {},
  addMessages: (output): void =>
    set((state) => ({
      messages: { ...state.messages, ...output },
    })),
}));
