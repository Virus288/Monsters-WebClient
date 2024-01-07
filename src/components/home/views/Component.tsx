import React from 'react';
import { AnimateEntry } from '../../customs';
import HomeHeader from './Header';
import { useMainSelector } from '../../../redux/hooks';
import * as hooks from '../../../redux';
import * as animation from '../../../animation';
import { RenderInitializedUi, RenderUninitializedUi } from './Renderer';

const Home: React.FC = () => {
  const { userName } = useMainSelector(hooks.accountState);

  return (
    <AnimateEntry variants={animation.opacity} initial="init" animate="visible" exit="exit">
      <HomeHeader />

      {userName ? <RenderInitializedUi /> : <RenderUninitializedUi />}
    </AnimateEntry>
  );
};

export default Home;
