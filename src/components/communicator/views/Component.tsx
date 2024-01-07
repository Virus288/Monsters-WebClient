import type React from 'react';
import { useEffect, useMemo } from 'react';
import Communicator from '../communicator';
import * as hooks from '../../../redux';
import { useMainDispatch, useMainSelector } from '../../../redux/hooks';
import { ESocketAction } from '../../../enums';

const SocketCommunicator: React.FC = () => {
  const dispatch = useMainDispatch();
  const communicator = useMemo(() => new Communicator(dispatch), [dispatch]);
  const { actions } = useMainSelector(hooks.websocketState);

  useEffect(() => {
    communicator.init();
  }, [communicator]);

  useEffect(() => {
    actions.forEach((a) => {
      dispatch(hooks.removeAction({ action: a.target }));

      switch (a.target) {
        case ESocketAction.GetChatMessages:
          communicator.getChatMessages();
          break;
        case ESocketAction.SendChatMessage:
          communicator.sendChatMessage(a);
          break;
        default:
          break;
      }
    });
  }, [actions, communicator, dispatch]);

  return null;
};

export default SocketCommunicator;
