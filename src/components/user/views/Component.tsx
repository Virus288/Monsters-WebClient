import React from 'react';
import { Container, ContainerBody } from '../../customs';
import * as animation from '../../../animation';

const User: React.FC = () => {
  return (
    <Container variants={animation.slowSlideRight} initial="init" animate="visible" exit="exit">
      <ContainerBody>User</ContainerBody>
    </Container>
  );
};

export default User;
