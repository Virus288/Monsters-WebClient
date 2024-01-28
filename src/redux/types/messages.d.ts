import type { PayloadAction } from '@reduxjs/toolkit';
import type { IDetailedMessage, IGetMessages } from '../../types/messages';

export interface IMessagesState {
  chats: IGetMessages[];
  details: IDetailedMessage[];
}

interface IAddChatsBody {
  chats: Record<string, IGetMessages>;
}

interface IAddMessagesBody {
  details: IDetailedMessage[];
}

export type IAddMessagesAction = PayloadAction<IAddMessagesBody>;
export type IAddChatsAction = PayloadAction<IAddChatsBody>;
