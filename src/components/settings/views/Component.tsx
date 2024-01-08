import React from 'react';
import type { DefaultTheme } from 'styled-components';
import { useTheme } from 'styled-components';
import { AnimateEntry, Button, Header } from '../../customs';
import * as animation from '../../../animation';
import changeTheme from '../utils';
import { SettingsBody, SettingsContainer } from '../themed';

const Settings: React.FC<{
  disablePanel: (e) => void;
  setTheme: React.Dispatch<React.SetStateAction<DefaultTheme>>;
}> = ({ disablePanel, setTheme }) => {
  const theme = useTheme();

  return (
    <AnimateEntry variants={animation.opacity} initial="init" animate="visible" exit="exit">
      <SettingsContainer>
        <SettingsBody>
          <Header>Theme:</Header>
          <Button onClick={(): void => changeTheme(setTheme, theme)}>Change theme</Button>
          <Button onClick={(e): void => disablePanel(e)}>Close</Button>
        </SettingsBody>
      </SettingsContainer>
    </AnimateEntry>
  );
};

export default Settings;
