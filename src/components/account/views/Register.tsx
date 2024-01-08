import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { AnimateEntry, Button, Container, ContainText, GreenText, Header, Input, Label, RedText } from '../../customs';
import * as animation from '../../../animation';
import type { IRegisterForm } from '../../../types';
import { register } from '../handler';
import { sendToLoginPage } from '../../home/handler';
import { RegisterForm } from '../themed/register';

const Register: React.FC = () => {
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<boolean>(false);

  return (
    <AnimateEntry variants={animation.slowSlideRight} initial="init" animate="visible" exit="exit">
      <Container $justify="space-evenly" $height={50} $spacer>
        <Header>Register</Header>
        <ContainText $width={50}>
          <AnimatePresence mode="wait">{error ? <RedText>{error}</RedText> : null}</AnimatePresence>
        </ContainText>
        <ContainText $width={50}>
          <AnimatePresence mode="wait">
            {success ? <GreenText>Success. Please log in</GreenText> : null}
          </AnimatePresence>
        </ContainText>

        <RegisterForm
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
        </RegisterForm>

        <Button onClick={(): void => sendToLoginPage()}>Log in</Button>
      </Container>
    </AnimateEntry>
  );
};

export default Register;
