import React, { useEffect, useState } from 'react';
import type { DefaultTheme } from 'styled-components';
import { AnimatePresence } from 'framer-motion';
import Router from '../../../Rotuer';
import Navbar from './Navbar';
import { App } from '../../customs';
import Settings from '../../settings/views/Component';
import { toggleSettings } from '../utils';
import type * as enums from '../../../enums';
import { Login, Register } from '../../index';
import { preLogin } from '../../account/handler';
import Loading from './Loading';

const StaticHandlers: React.FC<{
  setTheme: React.Dispatch<React.SetStateAction<DefaultTheme>>;
  setSettings: React.Dispatch<React.SetStateAction<boolean>>;
  settings: boolean;
}> = ({ setTheme, settings, setSettings }) => {
  return (
    <AnimatePresence mode="wait">
      {settings ? (
        <Settings setTheme={setTheme} disablePanel={(e: React.MouseEvent): void => toggleSettings(e, setSettings)} />
      ) : null}
    </AnimatePresence>
  );
};

const Account: React.FC<{
  view: string;
  setView: React.Dispatch<React.SetStateAction<string>>;
  setReady: React.Dispatch<React.SetStateAction<boolean>>;
  setExit: React.Dispatch<React.SetStateAction<boolean>>;
  exit: boolean;
}> = ({ view, setView, setReady, exit, setExit }) => {
  return (
    <AnimatePresence mode="wait">
      {view === 'login' ? (
        exit ? (
          <Login setReady={setReady} setView={setView} setExit={setExit} />
        ) : null
      ) : exit ? (
        <Register setView={setView} setExit={setExit} />
      ) : null}
    </AnimatePresence>
  );
};

const ViewsController: React.FC<{
  setTheme: React.Dispatch<React.SetStateAction<DefaultTheme>>;
  setAppActive: React.Dispatch<React.SetStateAction<enums.EAppState>>;
  appActive: enums.EAppState;
}> = ({ setTheme, appActive, setAppActive }) => {
  const [settings, setSettings] = useState<boolean>(false);
  const [ready, setReady] = useState<boolean>(false);
  const [view, setView] = useState<string>('login');
  const [preReady, setPreReady] = useState<boolean>(false);
  const [exit, setExit] = useState<boolean>(true);

  useEffect(() => {
    preLogin(setPreReady, setReady);
  }, []);

  if (!preReady) {
    return <Loading finished={preReady} />;
  }

  return !ready ? (
    <Account view={view} setView={setView} setReady={setReady} exit={exit} setExit={setExit} />
  ) : (
    <App>
      <StaticHandlers setTheme={setTheme} settings={settings} setSettings={setSettings} />
      <Navbar setSettings={setSettings} appActive={appActive} setAppActive={setAppActive} settings={settings} />
      <Router />
    </App>
  );
};

export default ViewsController;
