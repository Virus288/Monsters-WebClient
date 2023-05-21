import React, { useEffect, useState } from 'react';
import type { DefaultTheme } from 'styled-components';
import { AnimatePresence } from 'framer-motion';
import Router from '../../../Rotuer';
import * as themes from '../../customs/theme';
import Navbar from './Navbar';
import { App } from '../../customs';
import Settings from '../../settings/views/Component';

const StaticHandlers: React.FC<{
  setTheme: React.Dispatch<React.SetStateAction<DefaultTheme>>;
  setSettings: React.Dispatch<React.SetStateAction<boolean>>;
  settings: boolean;
}> = ({ setTheme, settings, setSettings }) => {
  return (
    <AnimatePresence mode="wait">
      {settings ? <Settings setTheme={setTheme} disablePanel={(): void => setSettings(false)} /> : null}
    </AnimatePresence>
  );
};

const ViewsController: React.FC<{ setTheme: React.Dispatch<React.SetStateAction<DefaultTheme>> }> = ({ setTheme }) => {
  const [settings, setSettings] = useState<boolean>(false);

  useEffect(() => {
    setTheme(themes.lightTheme);
  }, [setTheme]);

  return (
    <App>
      <StaticHandlers setTheme={setTheme} settings={settings} setSettings={setSettings} />
      <Navbar setSettings={setSettings} settings={settings} />
      <Router />
    </App>
  );
};

export default ViewsController;
