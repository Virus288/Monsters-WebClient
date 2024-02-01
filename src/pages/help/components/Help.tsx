import React, { useEffect, useState } from 'react';
import { AnimateEntry, Button, OverlayContainer } from '../../../shared/styled';
import * as animation from '../../../style/animation';
import { useMainDispatch } from '../../../redux/hooks';
import * as hooks from '../../../redux';
import { allCommands } from '../../../enums/commandsDescriptions';
import { renderCommands } from './Renderer';
import { HelpContainer } from '../styled';

const Help: React.FC<{ availableCommands: string[] }> = ({ availableCommands }) => {
  const dispatch = useMainDispatch();
  const [toRender, setToRender] = useState<Record<string, string>>({});

  useEffect(() => {
    if (Object.keys(toRender).length === availableCommands.length) return;

    const prepared: Record<string, string> = {};

    availableCommands.forEach((c) => {
      if (typeof allCommands[c] === 'string') {
        prepared[c] = allCommands[c] as string;
      }
    });

    setToRender(prepared);
  }, [availableCommands, toRender]);

  return (
    <AnimateEntry variants={animation.opacity} initial="init" animate="visible" exit="exit">
      <OverlayContainer>
        <HelpContainer>
          {renderCommands(toRender)}
          <Button onClick={() => dispatch(hooks.closeHelpPanel())}>Close</Button>
        </HelpContainer>
      </OverlayContainer>
    </AnimateEntry>
  );
};

export default Help;
