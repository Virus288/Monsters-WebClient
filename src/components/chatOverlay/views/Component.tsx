import React from 'react';
import { ChatBody, ChatMessage, ChatOverlayIcons, ChatSendButton } from '../themed';
import * as animation from '../../../animation';
import { Container, ContainerBody, Input } from '../../customs';

const ChatOverlay: React.FC = () => {
  return (
    <Container variants={animation.slowSlideRight} initial="init" animate="visible" exit="exit">
      <ContainerBody $justify="space-between">
        <div>Upper panel</div>
        <ChatBody>
          <ChatMessage>Banana</ChatMessage>
          <ChatMessage>Banana2</ChatMessage>
          <ChatMessage>Banana3</ChatMessage>
          <ChatMessage>Banana3</ChatMessage>
          <ChatMessage>Banana3</ChatMessage>
          <ChatMessage>Banana3</ChatMessage>
          <ChatMessage>Banana3</ChatMessage>
          <ChatMessage>Banana3</ChatMessage>
          <ChatMessage>Banana3</ChatMessage>
          <ChatMessage>Banana3</ChatMessage>
          <ChatMessage>Banana3</ChatMessage>
          <ChatMessage>Banana3</ChatMessage>
          <ChatMessage>Banana3</ChatMessage>
          <ChatMessage>Banana3</ChatMessage>
          <ChatMessage>Banana3</ChatMessage>
          <ChatMessage>Banana3</ChatMessage>
          <ChatMessage>Banana3</ChatMessage>
          <ChatMessage>Banana3</ChatMessage>
          <ChatMessage>Banana3</ChatMessage>
          <ChatMessage>Banana3</ChatMessage>
          <ChatMessage>Banana3</ChatMessage>
          <ChatMessage>Banana3</ChatMessage>
          <ChatMessage>Banana3</ChatMessage>
          <ChatMessage>Banana3</ChatMessage>
          <ChatMessage>Banana3</ChatMessage>
          <ChatMessage>Banana3</ChatMessage>
          <ChatMessage>Banana3</ChatMessage>
          <ChatMessage>Banana3</ChatMessage>
          <ChatMessage>Banana3</ChatMessage>
          <ChatMessage>Banana3</ChatMessage>
          <ChatMessage>Banana3</ChatMessage>
          <ChatMessage>Banana3</ChatMessage>
          <ChatMessage>Banana3</ChatMessage>
          <ChatMessage>Banana3</ChatMessage>
          <ChatMessage>Banana3</ChatMessage>
          <ChatMessage>Banana3</ChatMessage>
          <ChatMessage>Banana3</ChatMessage>
          <ChatMessage>Banana3</ChatMessage>
          <ChatMessage>Banana3</ChatMessage>
          <ChatMessage>Banana3</ChatMessage>
          <ChatMessage>Banana3</ChatMessage>
          <ChatMessage>Banana3</ChatMessage>
          <ChatMessage>Banana3</ChatMessage>
          <ChatMessage>Banana3</ChatMessage>
          <ChatMessage>Banana3</ChatMessage>
          <ChatMessage>Banana3</ChatMessage>
          <ChatMessage>Banana3</ChatMessage>
          <ChatMessage>Banana3</ChatMessage>
          <ChatMessage>Banana3</ChatMessage>
          <ChatMessage>Banana3</ChatMessage>
          <ChatMessage>Banana3</ChatMessage>
          <ChatMessage>Banana3</ChatMessage>
          <ChatMessage>Banana3</ChatMessage>
          <ChatMessage>Banana3</ChatMessage>
          <ChatMessage>Banana3</ChatMessage>
          <ChatMessage>Banana3</ChatMessage>
          <ChatMessage>Banana3</ChatMessage>
          <ChatMessage>Banana3</ChatMessage>
        </ChatBody>
        <ChatOverlayIcons>
          <Input $full placeholder="message" />
          <ChatSendButton />
        </ChatOverlayIcons>
      </ContainerBody>
    </Container>
  );
};

export default ChatOverlay;
