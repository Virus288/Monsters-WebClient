import React from 'react';
import { Container, ContainerBody } from '../../customs';
import * as animation from '../../../animation';

const Inventory: React.FC = () => {
  return (
    <Container variants={animation.slowSlideRight} initial="init" animate="visible" exit="exit">
      <ContainerBody>Inventory</ContainerBody>
    </Container>
  );
};

export default Inventory;
