import React from 'react';
import { Button, Container, ContainerBody, Header } from '../../customs';
import * as animation from '../../../animation';
import { useMainDispatch, useMainSelector } from '../../../redux/hooks';
import * as hooks from '../../../redux';
import { toggleSettings } from '../../generic/utils';
import { logout, sendToLoginPage } from '../handler';

const Home: React.FC = () => {
  const dispatch = useMainDispatch();
  const { settings } = useMainSelector(hooks.staticState);
  const { userName } = useMainSelector(hooks.accountState);

  return (
    <Container variants={animation.slowSlideRight} initial="init" animate="visible" exit="exit">
      <ContainerBody>
        <Header>{userName ? `User is logged in as ${userName}` : 'User is not logged in'}</Header>
        <Button onClick={(): void => toggleSettings(dispatch, settings)}>Settings</Button>
        {userName ? (
          <Button onClick={(): void => logout(dispatch)}>Log out</Button>
        ) : (
          <Button onClick={(): void => sendToLoginPage()}>Log in</Button>
        )}
      </ContainerBody>
    </Container>
  );
};

export default Home;
