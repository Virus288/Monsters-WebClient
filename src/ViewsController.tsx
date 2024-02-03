import React, { useEffect, useState } from 'react';
import type { DefaultTheme } from 'styled-components';
import { AnimatePresence } from 'framer-motion';
import Router from './Router';
import { App } from './shared/styled';
import * as components from './pages';
import { preLogin } from './pages/account/handler';
import Loading from './shared/components/Loading';
import { useMainDispatch, useMainSelector } from './redux/hooks';
import Navbar from './shared/components/Navbar';
import { toggleAccount, toggleSettings } from './shared/styled/utils';

const StaticHandlers: React.FC<{
  setTheme: React.Dispatch<React.SetStateAction<DefaultTheme>>;
}> = ({ setTheme }) => {
  const dispatch = useMainDispatch();
  const { settings, account } = useMainSelector((states) => states.statics);

  return (
    <AnimatePresence mode="wait">
      {settings ? (
        <components.Settings setTheme={setTheme} disablePanel={(): void => toggleSettings(dispatch, settings)} />
      ) : null}
      {account ? <components.Account disablePanel={(): void => toggleAccount(dispatch, account)} /> : null}
    </AnimatePresence>
  );
};

const ViewsController: React.FC<{
  setTheme: React.Dispatch<React.SetStateAction<DefaultTheme>>;
}> = ({ setTheme }) => {
  const dispatch = useMainDispatch();
  const [ready, setReady] = useState<boolean>(false);

  useEffect(() => {
    preLogin(dispatch)
      .then(() => setReady(true))
      .catch(() => setReady(true));
  }, [dispatch]);

  if (!ready) {
    return <Loading finished={ready} />;
  }

  return (
    <>
      <Navbar />
      <App>
        <StaticHandlers setTheme={setTheme} />
        <Router />
      </App>
    </>
  );
};

export default ViewsController;
