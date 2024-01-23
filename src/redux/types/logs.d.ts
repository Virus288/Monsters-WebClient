import type { PayloadAction } from '@reduxjs/toolkit';

export interface ILogsState {
  logs: string[];
}

interface IAddLogBody {
  message: string;
}

export type IAddLogAction = PayloadAction<IAddLogBody>;
