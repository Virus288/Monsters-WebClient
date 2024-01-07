import type { PayloadAction } from '@reduxjs/toolkit';
import type { ESocketAction } from '../../enums';

export interface ISocketAuction {
  target: ESocketAction;
  payload?: { message: string; target: string } | Record<string, unknown>;
}

export interface IWebsocketState {
  connected: boolean;
  messages: unknown[];
  actions: ISocketAuction[];
}

interface INewMessageBody {
  messages: unknown[];
}

interface ISocketActionBody {
  action: ESocketAction;
  payload?: { message: string; target: string } | Record<string, unknown>;
}

export type INewMessageAction = PayloadAction<INewMessageBody>;
export type ISocketAction = PayloadAction<ISocketActionBody>;
