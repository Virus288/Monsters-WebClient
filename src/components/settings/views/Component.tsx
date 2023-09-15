import React from 'react';
import type { DefaultTheme } from 'styled-components';
import { useTheme } from 'styled-components';
import { Button, ExitButton, Header } from '../../customs';
import * as animation from '../../../animation';
import changeTheme from '../utils';
import { SettingsBody, SettingsContainer } from '../themed';

const Settings: React.FC<{
  disablePanel: (e) => void;
  setTheme: React.Dispatch<React.SetStateAction<DefaultTheme>>;
}> = ({ disablePanel, setTheme }) => {
  const theme = useTheme();

  return (
    <SettingsContainer id="SettingsContainer" variants={animation.opacity} initial="init" animate="visible" exit="exit">
      <ExitButton onClick={(e): void => disablePanel(e)}>X</ExitButton>
      <SettingsBody $justify="flex-start">
        <Header>Theme:</Header>
        <Button onClick={(): void => changeTheme(setTheme, theme)}>Change theme</Button>
      </SettingsBody>
    </SettingsContainer>
  );
};

export default Settings;
