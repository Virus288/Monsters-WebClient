import React from 'react';
import { Container, ContainerBody } from '../../customs';
import * as animation from '../../../animation';

const Messages: React.FC = () => {
  return (
    <Container variants={animation.slowSlideRight} initial="init" animate="visible" exit="exit">
      <ContainerBody>Messages</ContainerBody>
    </Container>
  );
};

export default Messages;
