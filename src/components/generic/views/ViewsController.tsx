import React, { useEffect, useState } from 'react';
import type { DefaultTheme } from 'styled-components';
import { AnimatePresence } from 'framer-motion';
import Router from '../../../Rotuer';
import { App } from '../../customs';
import Settings from '../../settings/views/Component';
import { toggleSettings } from '../utils';
import { Login, Register } from '../../index';
import { preLogin } from '../../account/handler';
import Loading from './Loading';
import { useMainDispatch, useMainSelector } from '../../../redux/hooks';

const StaticHandlers: React.FC<{
  setTheme: React.Dispatch<React.SetStateAction<DefaultTheme>>;
}> = ({ setTheme }) => {
  const dispatch = useMainDispatch();
  const { settings } = useMainSelector((states) => states.statics);

  return (
    <AnimatePresence mode="wait">
      {settings ? <Settings setTheme={setTheme} disablePanel={(): void => toggleSettings(dispatch, settings)} /> : null}
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
}> = ({ setTheme }) => {
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
      <StaticHandlers setTheme={setTheme} />
      <Router />
    </App>
  );
};

export default ViewsController;
