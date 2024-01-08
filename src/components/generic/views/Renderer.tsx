import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useMainDispatch, useMainSelector } from '../../../redux/hooks';
import * as hooks from '../../../redux';
import { AccountPopup } from '../../home/themed/popup';
import * as animations from '../../../animation';
import { Button } from '../../customs';
import { logout, sendToLoginPage } from '../../home/handler';

// eslint-disable-next-line import/prefer-default-export
export const RenderAccountPopup: React.FC<{ show: boolean }> = ({ show }) => {
  const dispatch = useMainDispatch();
  const navigate = useNavigate();
  const { userName } = useMainSelector(hooks.accountState);

  return (
    <AnimatePresence mode="wait">
      {show ? (
        <AccountPopup variants={animations.opacity} initial="init" animate="visible" exit="exit">
          {userName ? (
            <Button onClick={(): void => logout(dispatch)}>Log out</Button>
          ) : (
            <>
              <Button onClick={(): void => sendToLoginPage()}>Log in</Button>
              <Button onClick={(): void => navigate('/register')}>Register</Button>
            </>
          )}
        </AccountPopup>
      ) : null}
    </AnimatePresence>
  );
};
