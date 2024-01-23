import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Container } from '../../customs';
import { LogBottomContainer, LogButton, LogInput, LogsContainer } from '../themed/logs';
import { useMainDispatch, useMainSelector } from '../../../redux/hooks';
import * as hooks from '../../../redux';
import { generateNewUserLogs } from '../controller';

export const renderInnerLogs = (
  logs: {
    log: string;
    id: number;
  }[],
  animationEnd: () => void,
): (JSX.Element | null)[] => {
  return logs.map((l) => {
    const splitted = l.log.split('');
    let animationFinished = 0;

    const onAnimationComplete = (): void => {
      animationFinished++;
      if (animationFinished === splitted.length) {
        setTimeout(() => {
          animationEnd();
        }, 500);
      }
    };

    return l ? (
      <motion.div key={l.id} transition={{ duration: splitted.length }}>
        {'- '}
        {splitted.map((letter, index) => (
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
    ) : null;
  });
};

export const RenderLogs: React.FC<{ width: number }> = ({ width }) => {
  const dispatch = useMainDispatch();
  const { logs } = useMainSelector(hooks.logsState);
  const [localLogs, setLocalLogs] = useState<{ log: string; id: number }[]>([]);
  const [canRenderLogs, setCanRenderLogs] = useState<boolean>(true);
  const controls = useAnimation();

  useEffect(() => {
    if (logs.length > 0 && logs.length !== localLogs.length && canRenderLogs) {
      setLocalLogs((prevLogs) => [...prevLogs, { log: logs[localLogs.length] as string, id: localLogs.length }]);
      setCanRenderLogs(false);
    }
  }, [localLogs.length, logs, canRenderLogs]);

  useEffect(() => {
    if (logs.length === 0) {
      // fetchLogs.then(newLogs => {
      // if (!newLogs) {
      generateNewUserLogs(dispatch);
      // }
      // }).catch(err => {
      //   console.log(err)
      // })
    } else {
      controls.start({ opacity: 1 }).catch((err) => console.log(err));
    }
  }, [dispatch, logs.length, controls]);

  return (
    <LogsContainer $width={width}>
      <motion.div animate={controls}>{renderInnerLogs(localLogs, () => setCanRenderLogs(true))}</motion.div>
    </LogsContainer>
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

export const RenderInitializedUi: React.FC = () => {
  const [width, setWidth] = useState<number>(200);

  useEffect(() => {
    setWidth(400);
  }, []);

  return (
    <Container>
      <RenderLogs width={width} />
      <LogBottomContainer $width={width}>
        <LogInput placeholder="Write your command..." />
        <LogButton>
          <i className="icon-right-open" />
        </LogButton>
      </LogBottomContainer>
    </Container>
  );
};
