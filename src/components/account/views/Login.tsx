import React, { useState } from 'react';
import { Button, Container, ContainerBody, ErrorText, Form, Header, Input, Label } from '../../customs';
import * as animation from '../../../animation';
import { logIn } from '../handler';
import type { ILoginForm } from '../../../types';
import { animateExit } from '../utils';

const Login: React.FC<{
  setReady: React.Dispatch<React.SetStateAction<boolean>>;
  setView: React.Dispatch<React.SetStateAction<string>>;
  setExit: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setReady, setView, setExit }) => {
  const [error, setError] = useState<string | undefined>(undefined);

  return (
    <Container variants={animation.slowSlideRight} initial="init" animate="visible" exit="exit">
      <ContainerBody $justify="space-around">
        <Header>Log in</Header>
        {error ? <ErrorText>{error}</ErrorText> : null}
        <Form
          onSubmit={(e: React.FormEvent<ILoginForm>): void => logIn(e, setError, setReady)}
          onClick={(): void => setError(undefined)}
        >
          <Label>Username</Label>
          <Input name="username" id="username" type="string" placeholder="Username" required />

          <Label>Password</Label>
          <Input name="password" id="password" type="password" placeholder="Password" required />

          <Button type="submit">Send</Button>
        </Form>

        <Button onClick={(): void => animateExit(setExit, () => setView('register'))}>Register</Button>
      </ContainerBody>
    </Container>
  );
};

export default Login;
