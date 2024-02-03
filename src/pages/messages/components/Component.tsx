import type React from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import type LogsController from '../../../logs';
import { EMessageComponentActions } from '../../../enums';
import { useMainDispatch, useMainSelector } from '../../../redux/hooks';
import * as hooks from '../../../redux';
import Handler from '../handler';

/**
 * Component used only to communicate with logsController to fetch messages
 * In the future, it will handle websocket chats
 */
const Messages: React.FC<{
  logsController: LogsController;
  setCanWrite: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ logsController, setCanWrite }) => {
  const { chats, details } = useMainSelector(hooks.messagesState);
  const { profile } = useMainSelector(hooks.profileState);
  const [action, setAction] = useState<
    | {
        action: EMessageComponentActions;
        params: string | number;
      }
    | undefined
  >(undefined);
  const dispatch = useMainDispatch();
  const handler = useMemo(() => {
    return new Handler(
      dispatch,
      (data: boolean) => setCanWrite(data),
      (
        data:
          | {
              action: EMessageComponentActions;
              params: string | number;
            }
          | undefined,
      ) => setAction(data),
    );
  }, [dispatch, setCanWrite]);

  const handleAction = useCallback(() => {
    switch (action?.action) {
      case EMessageComponentActions.RenderAllConversations:
        // #TODO This is extremely stupid, but 'addLog' without any async action is triggering too fast and is breaking log container. Add some kind of pause, while adding elements to redux
        setTimeout(() => {
          if (!chats || chats.length === 0) {
            dispatch(hooks.addLog({ message: "You didn't send any messages yet", author: 1 }));
          } else {
            dispatch(hooks.addLog({ message: "You've been chatting with these people: ", author: 1 }));
            chats.forEach((c) => {
              dispatch(
                hooks.addLog({
                  message: c.receiver === profile.user ? c.sender : c.receiver,
                  author: 1,
                }),
              );
            });
          }
        }, 1000);
        break;
      case EMessageComponentActions.GetMessage:
        handler.runAction(
          EMessageComponentActions.GetMessage,
          chats.find((c) => c.receiver === action.params || c.sender === action.params),
        );
        break;
      case EMessageComponentActions.RenderMessageDetails:
        handler.runAction(
          EMessageComponentActions.RenderMessageDetails,
          details.filter((d) => d.chatId === action.params),
        );
        break;
      default:
        break;
    }
  }, [action?.action, action?.params, handler, chats, details, dispatch, profile.user]);

  useEffect(() => {
    logsController.setMessagesComponentAction(
      (
        data:
          | {
              action: EMessageComponentActions;
              params: string | number;
            }
          | undefined,
      ) => setAction(data),
    );
    logsController.initLoadData();
  }, [logsController]);

  useEffect(() => {
    if (action) handleAction();
  }, [action, handleAction]);

  return null;
};

export default Messages;
