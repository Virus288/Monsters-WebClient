import type { PayloadAction } from '@reduxjs/toolkit';

export interface IAccountState {
  userName: string | undefined;
}

interface IAccountBody {
  userName: string;
}

export type IAccountAction = PayloadAction<IAccountBody>;
