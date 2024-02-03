import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimateEntry, Button, OverlayContainer, OverlayContainerBody } from '../../../shared/styled';
import * as animation from '../../../style/animation';
import { useMainSelector } from '../../../redux/hooks';
import * as hooks from '../../../redux';

const Account: React.FC<{ disablePanel: (e) => void }> = ({ disablePanel }) => {
  const navigate = useNavigate();
  const { userName } = useMainSelector(hooks.accountState);

  useEffect(() => {
    if (!userName) navigate('/');
  }, [navigate, userName]);

  return (
    <AnimateEntry variants={animation.opacity} initial="init" animate="visible" exit="exit">
      <OverlayContainer>
        <OverlayContainerBody>
          <h4>This panel is under construction</h4>
          <Button onClick={(e): void => disablePanel(e)}>Close</Button>
        </OverlayContainerBody>
      </OverlayContainer>
    </AnimateEntry>
  );
};

export default Account;
