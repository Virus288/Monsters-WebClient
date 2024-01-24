import React from 'react';
import { AnimateEntry } from '../../../shared/styled';
import { useMainSelector } from '../../../redux/hooks';
import * as hooks from '../../../redux';
import * as animation from '../../../style/animation';
import { RenderInitializedUi, RenderUninitializedUi } from './Renderer';

const Home: React.FC = () => {
  const { userName } = useMainSelector(hooks.accountState);

  return (
    <AnimateEntry variants={animation.opacity} initial="init" animate="visible" exit="exit">
      {userName ? <RenderInitializedUi /> : <RenderUninitializedUi />}
    </AnimateEntry>
  );
};

export default Home;
