export interface ISocketMessage {
  type: ESocketType;
  payload: unknown;
}

export interface ISocketNewMessage {
  receiver: string;
  sender: string;
  body: string;
}
