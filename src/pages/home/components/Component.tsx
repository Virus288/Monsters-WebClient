import React, { useEffect, useMemo, useState } from 'react';
import { AnimateEntry, Container } from '../../../shared/styled';
import { useMainDispatch, useMainSelector } from '../../../redux/hooks';
import * as hooks from '../../../redux';
import * as animation from '../../../style/animation';
import { RenderLogs, RenderLogsInput } from './Renderer';
import LogsController from '../../../logs';
import Help from '../../help/components/Help';
import Websocket from '../../websocket/components/FourOhFour';
import Messages from '../../messages/components/Messages';

const RenderInitializedUi: React.FC = () => {
  const [width, setWidth] = useState<number>(200);
  const [canWrite, setCanWrite] = useState<boolean>(false);
  const { profile } = useMainSelector(hooks.profileState);
  const { userName } = useMainSelector(hooks.accountState);
  const { help } = useMainSelector((states) => states.statics);

  const dispatch = useMainDispatch();
  const logsController = useMemo(() => {
    return new LogsController(dispatch, (data: boolean) => setCanWrite(data), {
      profile,
      userName: userName as string,
    });
  }, [dispatch, profile, userName]);

  useEffect(() => {
    setWidth(500);
  }, []);

  return (
    <Container>
      {help ? <Help availableCommands={logsController.getAvailableCommandsKeys()} /> : null}
      <Websocket />
      <Messages logsController={logsController} setCanWrite={setCanWrite} />
      <RenderLogs width={width} setCanWrite={setCanWrite} logsController={logsController} />
      <RenderLogsInput width={width} canWrite={canWrite} logsController={logsController} />
    </Container>
  );
};

const RenderUninitializedUi: React.FC = () => {
  return (
    <Container>
      <h1>Monsters</h1>
      <h3>Text based RPG game</h3>
      <h3>( work in progress )</h3>
    </Container>
  );
};

const Home: React.FC = () => {
  const { userName } = useMainSelector(hooks.accountState);

  return (
    <AnimateEntry variants={animation.opacity} initial="init" animate="visible" exit="exit">
      {userName ? <RenderInitializedUi /> : <RenderUninitializedUi />}
    </AnimateEntry>
  );
};

export default Home;
