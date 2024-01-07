import React from 'react';
import { useMainDispatch, useMainSelector } from '../../../redux/hooks';
import * as hooks from '../../../redux';
import { Button, Container } from '../../customs';
import { toggleSettings } from '../../generic/utils';

export const RenderUninitializedUi: React.FC = () => {
  return (
    <Container>
      <h1>Monsters</h1>
      <h3>Text based RPG game</h3>
      <h3>( work in progress )</h3>
    </Container>
  );
};

export const RenderInitializedUi: React.FC = () => {
  const dispatch = useMainDispatch();
  const { settings } = useMainSelector(hooks.staticState);
  const { userName } = useMainSelector(hooks.accountState);

  return (
    <Container>
      <h2>Welcome {userName}</h2>
      <Button onClick={(): void => toggleSettings(dispatch, settings)}>Settings</Button>
    </Container>
  );
};
