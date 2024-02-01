// eslint-disable-next-line import/prefer-default-export
export enum EGenericActionsDescriptions {
  GetMessage = "GetMessage is used to get messages from conversation between you and another user. After writing this command, you will be asked for other's person name",
  GetMessages = 'GetMessages will get all your conversations between you and other users',
  GetUnreadMessages = 'GetUnreadMessages will list unread conversations',

  SendMessage = 'SendMessage command is used to send new message to another user. After typing it, system will ask you for message receiver and what you want to send',
}
