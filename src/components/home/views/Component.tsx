import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, ContainerBody } from '../../customs';
import * as animation from '../../../animation';
import { useMainDispatch, useMainSelector } from '../../../redux/hooks';
import * as hooks from '../../../redux';
import { toggleSettings } from '../../generic/utils';

const Home: React.FC = () => {
  const dispatch = useMainDispatch();
  const { settings } = useMainSelector(hooks.staticState);
  const navigate = useNavigate();

  return (
    <Container variants={animation.slowSlideRight} initial="init" animate="visible" exit="exit">
      <ContainerBody>
        <Button onClick={(): void => navigate('/chat')}>Chat</Button>
        <Button onClick={(): void => navigate('/messages')}>Messages</Button>
        <Button onClick={(): void => navigate('/party')}>Party</Button>
        <Button onClick={(): void => navigate('/inventory')}>Inventory</Button>
        <Button onClick={(): void => navigate('/profile')}>Profile</Button>
        <Button onClick={(): void => navigate('/user')}>User</Button>
        <Button onClick={(): void => toggleSettings(dispatch, settings)}>Settings</Button>
      </ContainerBody>
    </Container>
  );
};

export default Home;
