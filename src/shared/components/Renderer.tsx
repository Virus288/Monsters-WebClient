import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useMainSelector } from '../../redux/hooks';
import * as hooks from '../../redux';
import * as animations from '../../style/animation';
import { Button } from '../styled';
import { AccountPopup } from '../../pages/home/styled/popup';
import { logout, sendToLoginPage } from '../../pages/home/handler';

// eslint-disable-next-line import/prefer-default-export
export const RenderAccountPopup: React.FC<{ show: boolean }> = ({ show }) => {
  const navigate = useNavigate();
  const { userName } = useMainSelector(hooks.accountState);

  return (
    <AnimatePresence mode="wait">
      {show ? (
        <AccountPopup variants={animations.opacity} initial="init" animate="visible" exit="exit">
          {userName ? (
            <>
              <Button onClick={(): void => navigate('/account')}>Account</Button>
              <Button onClick={(): void => logout()}>Log out</Button>
            </>
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