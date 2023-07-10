import type { PayloadAction } from '@reduxjs/toolkit';

export interface IAccountState {
  logged: boolean;
}

interface IAccountBody {
  logged: boolean;
}

export type IAccountAction = PayloadAction<IAccountBody>;
