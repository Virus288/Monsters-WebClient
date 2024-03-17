import type { ReactNode } from 'react';
import type { EUserCommands } from '../enums';
import type { IUser, IUserProfile } from './account';

export type TerminalHistoryItem = ReactNode | string;
export type TerminalHistory = TerminalHistoryItem[];

export type TerminalCommands = {
  [command: string]: () => void;
};

export type TerminalProps = {
  promptLabel?: TerminalHistoryItem;
  account: IUser;
  profile: IUserProfile;
  addProfile: (profile: IUserProfile) => void;
};

export type IMiddleware = {
  state: EUserCommands;
  data: unknown;
  oldState?: EUserCommands;
};

export type IFightResponse = {
  character: string;
  action: string;
  target: string;
  value: number;
};
