import React from 'react';
import { Container, ContainerBody, Header } from '../../customs';
import * as animation from '../../../animation';

const Account: React.FC = () => {
  return (
    <Container variants={animation.slowSlideRight} initial="init" animate="visible" exit="exit">
      <ContainerBody>
        <Header $full>Account page</Header>
      </ContainerBody>
    </Container>
  );
};

export default Account;
