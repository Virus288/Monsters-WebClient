import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Button, Container, ContainerBody, ErrorText, Form, Header, Input, Label, SuccessText } from '../../customs';
import * as animation from '../../../animation';
import type { IRegisterForm } from '../../../types';
import { register } from '../handler';
import { animateExit } from '../utils';

const Register: React.FC<{
  setView: React.Dispatch<React.SetStateAction<string>>;
  setExit: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setView, setExit }) => {
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<boolean>(false);

  return (
    <Container variants={animation.slowSlideRight} initial="init" animate="visible" exit="exit">
      <ContainerBody $justify="space-around" $wrap="nowrap">
        <Header>Register in</Header>
        <AnimatePresence mode="wait">
          {error ? (
            <ErrorText variants={animation.opacity} initial="init" animate="visible" exit="exit">
              {error}
            </ErrorText>
          ) : null}
        </AnimatePresence>
        <AnimatePresence mode="wait">
          {success ? (
            <SuccessText variants={animation.opacity} initial="init" animate="visible" exit="exit">
              Success. Please log in
            </SuccessText>
          ) : null}
        </AnimatePresence>
        <Form
          onSubmit={(e: React.FormEvent<IRegisterForm>): void => register(e, setError, setSuccess)}
          onClick={(): void => setError(undefined)}
        >
          <Label>Username</Label>
          <Input name="username" id="username" type="string" placeholder="Username" required />

          <Label>Password</Label>
          <Input name="password" id="password" type="password" placeholder="Password" required />

          <Label>Repeat password</Label>
          <Input name="password2" id="password2" type="password" placeholder="Repeat password" required />

          <Label>Email</Label>
          <Input name="email" id="email" type="email" placeholder="Email" required />

          <Button type="submit">Send</Button>
        </Form>

        <Button onClick={(): void => animateExit(setExit, () => setView('login'))}>Log in</Button>
      </ContainerBody>
    </Container>
  );
};

export default Register;
