import React, { useEffect, useState } from 'react';
import type { DefaultTheme } from 'styled-components';
import { AnimatePresence } from 'framer-motion';
import Router from '../../../Rotuer';
import { App } from '../../customs';
import Settings from '../../settings/views/Component';
import { toggleSettings } from '../utils';
import { preLogin } from '../../account/handler';
import Loading from './Loading';
import { useMainDispatch, useMainSelector } from '../../../redux/hooks';
import SocketCommunicator from '../../communicator/views/Component';

const StaticHandlers: React.FC<{
  setTheme: React.Dispatch<React.SetStateAction<DefaultTheme>>;
}> = ({ setTheme }) => {
  const dispatch = useMainDispatch();
  const { settings } = useMainSelector((states) => states.statics);

  return (
    <AnimatePresence mode="wait">
      {settings ? <Settings setTheme={setTheme} disablePanel={(): void => toggleSettings(dispatch, settings)} /> : null}
      <SocketCommunicator />
    </AnimatePresence>
  );
};

const ViewsController: React.FC<{
  setTheme: React.Dispatch<React.SetStateAction<DefaultTheme>>;
}> = ({ setTheme }) => {
  const dispatch = useMainDispatch();
  const [preReady, setPreReady] = useState<boolean>(false);

  useEffect(() => {
    preLogin(dispatch)
      .then(() => setPreReady(true))
      .catch(() => setPreReady(true));
  }, [dispatch]);

  if (!preReady) {
    return <Loading finished={preReady} />;
  }

  return (
    <App>
      <StaticHandlers setTheme={setTheme} />
      <Router />
    </App>
  );
};

export default ViewsController;
