import React from 'react';
import type { DefaultTheme } from 'styled-components';
import { useTheme } from 'styled-components';
import { AnimateEntry, Button, Header } from '../../../shared/styled';

import * as animation from '../../../style/animation';
import changeTheme from '../utils';
import { SettingsBody, SettingsContainer } from '../styled';

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
