import type { ReactNode } from 'react';
import type { EUserCommands } from '../enums';

export type TerminalHistoryItem = ReactNode | string;
export type TerminalHistory = TerminalHistoryItem[];

export type TerminalCommands = {
  [command: string]: () => void;
};

export type TerminalProps = {
  history: TerminalHistory;
  promptLabel?: TerminalHistoryItem;
  commands: TerminalCommands;
};

export type IMiddleware = {
  state: EUserCommands;
  data: unknown;
  oldState?: EUserCommands;


}


export type IFightResponse = {
  character: string;
  action: string;
  target: string;
  value: number;
}
