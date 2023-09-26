import type React from 'react';
import type { MainDispatch } from '../../store/types';
import * as hooks from '../../redux';
import { ESocketAction } from '../../enums';

// eslint-disable-next-line import/prefer-default-export
export const sendChatMessage = (
  target: string,
  message: string | undefined,
  dispatch: MainDispatch,
  setMessage: React.Dispatch<React.SetStateAction<string | undefined>>,
): void => {
  if (!message) return;
  setMessage(undefined);

  dispatch(hooks.addAction({ action: ESocketAction.SendChatMessage, payload: { message, target } }));
};
