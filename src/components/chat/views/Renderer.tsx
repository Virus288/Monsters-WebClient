import type { ReactElement } from 'react';
import { ChatMessage } from '../themed';

// eslint-disable-next-line import/prefer-default-export
export const renderChatMessages = (messages: number[]): ReactElement[] => {
  return messages.map((m) => {
    return (
      <ChatMessage $sender key={m}>
        {m}
      </ChatMessage>
    );
  });
};
