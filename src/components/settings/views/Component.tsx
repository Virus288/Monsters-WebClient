import React from 'react';
import type { DefaultTheme } from 'styled-components';
import { useTheme } from 'styled-components';
import * as customs from '../../customs';
import { Button, PanelHeader } from '../../customs';
import * as animation from '../../../animation';
import changeTheme from '../utils';
import { SettingsBody, SettingsContainer } from '../themed';

const Settings: React.FC<{
  disablePanel: () => void;
  setTheme: React.Dispatch<React.SetStateAction<DefaultTheme>>;
}> = ({ disablePanel, setTheme }) => {
  const theme = useTheme();

  return (
    <SettingsContainer variants={animation.slideRight} initial="init" animate="visible" exit="exit">
      <customs.ExitButton onClick={(): void => disablePanel()}>
        <i className="icon-left-open-outline navIcon" />
      </customs.ExitButton>
      <SettingsBody $justify="flex-start">
        <PanelHeader>Settings</PanelHeader>
        <Button onClick={(): void => changeTheme(setTheme, theme)}>Change theme</Button>
      </SettingsBody>
    </SettingsContainer>
  );
};

export default Settings;
