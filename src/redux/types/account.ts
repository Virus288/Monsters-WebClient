import type { PayloadAction } from '@reduxjs/toolkit';

export interface IAccountState {
  userName: string | undefined;
  id: string | undefined;
}

interface IAccountBody {
  userName: string;
  id: string;
}

export type IAccountAction = PayloadAction<IAccountBody>;
