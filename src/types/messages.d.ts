import type { IDefaultResponse } from './generic';

export interface IPreparedMessagesBody {
  sender: string;
  receiver: string;
  messages: number;
}

export type IGetMessages = { data: Record<string, IPreparedMessagesBody> } & IDefaultResponse;
