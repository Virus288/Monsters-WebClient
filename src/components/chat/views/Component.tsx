import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as animation from '../../../animation';
import { Button, Container, ExitButton, Form, Header, Input, Label } from '../../customs';
import { ChatContainer, ChatMessagesContainer, InputBody } from '../themed';
import * as Renderer from './Renderer';
import * as hooks from '../../../redux';
import { useMainDispatch, useMainSelector } from '../../../redux/hooks';
import { ESocketAction } from '../../../enums';
import type { IChatUserForm } from '../../../types';
import { sendChatMessage } from '../controller';

const ChatInput: React.FC<{ target: string }> = ({ target }) => {
  const dispatch = useMainDispatch();
  const [message, setMessage] = useState<string | undefined>(undefined);

  return (
    <InputBody>
      <textarea
        value={message}
        placeholder="Write your message..."
        onChange={(e): void => setMessage(e.target.value)}
      />
      <Button onClick={(): void => sendChatMessage(target, message, dispatch, setMessage)}>Send</Button>
    </InputBody>
  );
};

const ChatMessages: React.FC = () => {
  return <ChatMessagesContainer>{Renderer.renderChatMessages([1, 2])}</ChatMessagesContainer>;
};

const ChatBody: React.FC<{ target: string }> = ({ target }) => {
  const dispatch = useMainDispatch();
  const navigate = useNavigate();
  const { messages } = useMainSelector(hooks.websocketState);

  useEffect(() => {
    if (!messages || messages.length === 0) dispatch(hooks.addAction({ action: ESocketAction.GetChatMessages }));
  }, [dispatch, messages]);

  return (
    <Container variants={animation.slowSlideRight} initial="init" animate="visible" exit="exit">
      <ChatContainer $justify="space-between">
        <ExitButton onClick={(): void => navigate('/')}>X</ExitButton>
        <ChatMessages />
        <ChatInput target={target} />
      </ChatContainer>
    </Container>
  );
};

const UserSelector: React.FC = () => {
  const [target, setTarget] = useState<string | null>(null);

  return target ? (
    <ChatBody target={target} />
  ) : (
    <Container variants={animation.slowSlideRight} initial="init" animate="visible" exit="exit">
      <ChatContainer $justify="space-between">
        <Form
          onSubmit={({ target }): void => {
            setTarget((target as IChatUserForm).user.value);
          }}
        >
          <Label>Receiver name</Label>
          <Input name="user" placeholder="Receiver" />

          <Button>Select</Button>
        </Form>
      </ChatContainer>
    </Container>
  );
};

const Chat: React.FC = () => {
  const { connected } = useMainSelector(hooks.websocketState);

  return connected ? (
    <UserSelector />
  ) : (
    <Container variants={animation.slowSlideRight} initial="init" animate="visible" exit="exit">
      <ChatContainer $justify="space-between">
        <Header>Chat not connected</Header>
      </ChatContainer>
    </Container>
  );
};

export default Chat;
