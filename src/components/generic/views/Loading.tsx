import React from 'react';
import * as animation from '../../../animation';
import { AnimateEntry, Container, Header } from '../../customs';
import * as icons from '../../customs/icons';

const Loading: React.FC<{ finished: boolean }> = ({ finished }) => {
  return (
    <AnimateEntry variants={animation.slowSlideRight} initial="init" animate="visible" exit="exit">
      <Container>
        {finished ? (
          <Header>Loaded</Header>
        ) : (
          <>
            <Header>Loading</Header>
            <icons.LoadingCircle />
          </>
        )}
      </Container>
    </AnimateEntry>
  );
};

export default Loading;
