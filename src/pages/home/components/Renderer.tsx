import type { ReactElement } from 'react';
import React, { useEffect, useMemo, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Container } from '../../../shared/styled';
import {
  HintBody,
  HintsContainer,
  LogAnimationContainer,
  LogBottomContainer,
  LogButton,
  LogInput,
  LogsContainer,
  UserLog,
} from '../styled/logs';
import { useMainDispatch, useMainSelector } from '../../../redux/hooks';
import * as hooks from '../../../redux';
import LogsController from '../../../logs';
import { scrollBottom } from '../handler';
import * as animation from '../../../style/animation';
import Messages from '../../messages/components/Messages';

export const renderLogsBody = (
  logs: { log: string; author: number | string; id: number; animate: boolean }[],
  animationEnd: () => void,
): (ReactElement | null)[] => {
  return logs.map((l) => {
    const split = l.log.split('');
    let animationFinished = 0;

    const onAnimationComplete = (): void => {
      animationFinished++;
      if (animationFinished === split.length) {
        setTimeout(() => {
          animationEnd();
        }, 500);
      }
    };

    return l ? (
      l.author === 0 ? (
        <UserLog key={l.id} transition={{ duration: split.length }}>
          {split.map((letter, index) => (
            <motion.span
              // eslint-disable-next-line react/no-array-index-key
              key={`${l.id}-${index}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.1, delay: index * 0.05 }}
              onAnimationComplete={onAnimationComplete}
            >
              {letter}
            </motion.span>
          ))}
          {' -'}
        </UserLog>
      ) : (
        <motion.div key={l.id} transition={{ duration: split.length }}>
          {'- '}
          {split.map((letter, index) => (
            <motion.span
              // eslint-disable-next-line react/no-array-index-key
              key={`${l.id}-${index}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.1, delay: index * 0.05 }}
              onAnimationComplete={onAnimationComplete}
            >
              {letter}
            </motion.span>
          ))}
        </motion.div>
      )
    ) : null;
  });
};

export const RenderLogs: React.FC<{
  width: number;
  setCanWrite: React.Dispatch<React.SetStateAction<boolean>>;
  logsController: LogsController;
}> = ({ width, setCanWrite, logsController }) => {
  const dispatch = useMainDispatch();
  const { logs } = useMainSelector(hooks.logsState);
  const [localLogs, setLocalLogs] = useState<
    {
      log: string;
      author: number | string;
      id: number;
      animate: boolean;
    }[]
  >([]);
  const [canRenderLogs, setCanRenderLogs] = useState<boolean>(true);
  const controls = useAnimation();

  useEffect(() => {
    if (logs.length > 0 && logs.length !== localLogs.length && canRenderLogs) {
      setLocalLogs((prevLogs) => [
        ...prevLogs,
        {
          log: logs[localLogs.length]?.log as string,
          author: logs[localLogs.length]?.author as number | string,
          id: localLogs.length,
          animate: true,
        },
      ]);
      setCanRenderLogs(false);
      setCanWrite(false);
      setTimeout(() => {
        scrollBottom();
      }, 100);
    } else if (logs.length === localLogs.length && canRenderLogs) {
      setCanWrite(true);
    }
  }, [localLogs.length, logs, canRenderLogs, setCanWrite]);

  useEffect(() => {
    logsController.init(logs).catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [logsController]);

  useEffect(() => {
    if (logs.length > 0) controls.start({ opacity: 1 }).catch((err) => console.log(err));
  }, [dispatch, logs.length, controls]);

  return (
    <LogsContainer $width={width}>
      <LogAnimationContainer id="logAnimationContainer" animate={controls}>
        {renderLogsBody(localLogs, () => setCanRenderLogs(true))}
      </LogAnimationContainer>
    </LogsContainer>
  );
};

export const RenderLogsInput: React.FC<{
  width: number;
  canWrite: boolean;
  logsController: LogsController;
}> = ({ width, canWrite, logsController }) => {
  const [message, setMessage] = useState<string>('');
  const [availableCommands, setAvailableCommands] = useState<string[]>([]);
  const [hints, setHints] = useState<string[]>([]);

  useEffect(() => {
    const prepared: string[] = [];

    availableCommands.forEach((e) => {
      if (message !== '' && e.includes(message.toLowerCase())) prepared.push(e.charAt(0).toUpperCase() + e.slice(1));
    });
    setHints(prepared);
  }, [availableCommands, message]);

  useEffect(() => {
    if (message === '') setAvailableCommands(logsController.getAvailableCommands());
  }, [logsController, message]);

  return (
    <>
      <HintsContainer $width={width}>
        {hints.map((h) => {
          return (
            <HintBody
              onClick={() => setMessage(h)}
              variants={animation.opacity}
              initial="init"
              animate="visible"
              exit="exit"
              key={h}
            >
              {h}
            </HintBody>
          );
        })}
      </HintsContainer>
      <LogBottomContainer $width={width}>
        <LogInput
          id="logsInput"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => logsController.sendLogOnEnter(e, canWrite, setMessage)}
          placeholder="Write your command..."
        />
        <LogButton onClick={() => logsController.sendLog(message, canWrite, setMessage)}>
          <i className="icon-right-open" />
        </LogButton>
      </LogBottomContainer>
    </>
  );
};

export const RenderInitializedUi: React.FC = () => {
  const [width, setWidth] = useState<number>(200);
  const [canWrite, setCanWrite] = useState<boolean>(false);
  const { profile } = useMainSelector(hooks.profileState);
  const { userName } = useMainSelector(hooks.accountState);

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
      <Messages logsController={logsController} setCanWrite={setCanWrite} />
      <RenderLogs width={width} setCanWrite={setCanWrite} logsController={logsController} />
      <RenderLogsInput width={width} canWrite={canWrite} logsController={logsController} />
    </Container>
  );
};

export const RenderUninitializedUi: React.FC = () => {
  return (
    <Container>
      <h1>Monsters</h1>
      <h3>Text based RPG game</h3>
      <h3>( work in progress )</h3>
    </Container>
  );
};
