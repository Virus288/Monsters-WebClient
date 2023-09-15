import React from 'react';
import { Container, ContainerBody } from '../../customs';
import * as animation from '../../../animation';

const Party: React.FC = () => {
  return (
    <Container variants={animation.slowSlideRight} initial="init" animate="visible" exit="exit">
      <ContainerBody>Party</ContainerBody>
    </Container>
  );
};

export default Party;
