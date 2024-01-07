import React from 'react';
import { HeaderBody } from '../themed/header';
import { Button, Header } from '../../customs';
import { logout, sendToLoginPage } from '../handler';
import { useMainDispatch, useMainSelector } from '../../../redux/hooks';
import * as hooks from '../../../redux';

const HomeHeader: React.FC = () => {
  const dispatch = useMainDispatch();
  const { userName } = useMainSelector(hooks.accountState);

  return (
    <HeaderBody>
      <Header $width="fit-content">Monsters</Header>

      {userName ? (
        <Button onClick={(): void => logout(dispatch)}>Log out</Button>
      ) : (
        <Button onClick={(): void => sendToLoginPage()}>Log in</Button>
      )}
    </HeaderBody>
  );
};

export default HomeHeader;
