export interface IGetMessages {
  sender: string;
  receiver: string;
  chatId: string;
}

export interface IDetailedMessage {
  _id: string;
  sender: string;
  receiver: string;
  read: boolean;
  chatId: string;
  date: string;
  message: string;
}
