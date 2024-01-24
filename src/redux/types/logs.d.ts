import type { PayloadAction } from '@reduxjs/toolkit';

export interface ILogsState {
  logs: { log: string; author: number | string }[];
}

interface IAddLogBody {
  message: string;
  author: number | string;
}

export type IAddLogAction = PayloadAction<IAddLogBody>;
