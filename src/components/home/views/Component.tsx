import React from 'react';
import { Container, ContainerBody, Header, OneLine, Orange } from '../../customs';
import * as animation from '../../../animation';

const Home: React.FC = () => {
  return (
    <Container variants={animation.slowSlideRight} initial="init" animate="visible" exit="exit">
      <ContainerBody>
        <Header $full>
          <OneLine>
            <Orange>Monsters</Orange>
          </OneLine>
          opensource backend for j-rpg games
        </Header>
      </ContainerBody>
    </Container>
  );
};

export default Home;
