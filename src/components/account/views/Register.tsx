import React, { useState } from 'react';
import { Button, Container, ContainerBody, ErrorText, Form, Header, Input, Label, SuccessText } from '../../customs';
import * as animation from '../../../animation';
import type { IRegisterForm } from '../../../types';
import { register } from '../handler';

const Register: React.FC<{ setView: React.Dispatch<React.SetStateAction<string>> }> = ({ setView }) => {
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<boolean>(false);

  return (
    <Container variants={animation.slowSlideRight} initial="init" animate="visible" exit="exit">
      <ContainerBody $justify="space-around">
        <Header>Register in</Header>
        {error ? <ErrorText>{error}</ErrorText> : null}
        {success ? <SuccessText>Success. Please log in</SuccessText> : null}
        <Form
          onSubmit={(e: React.FormEvent<IRegisterForm>): void => register(e, setError, setSuccess)}
          onClick={(): void => setError(undefined)}
        >
          <Label>Username</Label>
          <Input name="username" id="username" type="string" placeholder="Username" required />

          <Label>Password</Label>
          <Input name="password" id="password" type="password" placeholder="Password" required />

          <Label>Email</Label>
          <Input name="email" id="email" type="email" placeholder="Email" required />

          <Button type="submit">Send</Button>
        </Form>

        <Button onClick={(): void => setView('login')}>Log in</Button>
      </ContainerBody>
    </Container>
  );
};

export default Register;
