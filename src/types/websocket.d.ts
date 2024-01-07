import type * as enums from '../enums';

export interface ISocketPayload {
  [enums.EMessageSubTargets.Send]: ISendMessageDto;
  [enums.EMessageSubTargets.Get]: IGetMessageDto;
  [enums.EMessageSubTargets.Read]: IReadMessageDto;
  [enums.EMessageSubTargets.GetUnread]: IGetMessageDto;
}

export interface ISocketSubTargets {
  [enums.ESocketTargets.Chat]: enums.EMessageSubTargets;
}

export interface ISocketMessage {
  target: enums.ESocketTargets;
  subTarget: ISocketSubTargets[enums.ESocketTargets];
  payload: ISocketPayload[enums.ESocketTargets];
}
