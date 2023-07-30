import React from 'react';
import { Container, ContainerBody } from '../../customs';
import * as animation from '../../../animation';
import Chat from '../../chat/views/Component';

const Home: React.FC = () => {
  return (
    <Container variants={animation.slowSlideRight} initial="init" animate="visible" exit="exit">
      <ContainerBody $justify="space-between">
        <div>Status - hp, mana, etc</div>
        <div>Current location</div>
        <div>Actions</div>
        <Chat />
      </ContainerBody>
    </Container>
  );
};

export default Home;
