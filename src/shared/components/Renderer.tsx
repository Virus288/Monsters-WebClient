import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { useMainSelector } from '../../redux/hooks';
import * as hooks from '../../redux';
import * as animations from '../../style/animation';
import { Button, Input } from '../styled';
import { AccountPopup } from '../../pages/home/styled/popup';
import { logout, sendToLoginPage } from '../../pages/home/handler';
import { toggleAccount } from '../styled/utils';
import Cookies from '../../tools/cookies';

// eslint-disable-next-line import/prefer-default-export
export const RenderAccountPopup: React.FC<{ show: boolean }> = ({ show }) => {
  const dispatch = useDispatch();
  const { account } = useMainSelector(hooks.staticState);
  const navigate = useNavigate();
  const { userName } = useMainSelector(hooks.accountState);
  const [cookie, setCookie] = useState<string | undefined>(undefined);

  const addCookie = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      console.log('Adding cookie. Please refresh the page after adding');
      new Cookies().addLoginToken(cookie ?? '', Date.now() + 1000 * 60 * 24 * 30);
    }
  };

  return (
    <AnimatePresence mode="wait">
      {show ? (
        <AccountPopup variants={animations.opacity} initial="init" animate="visible" exit="exit">
          {userName ? (
            <>
              <Button onClick={(): void => toggleAccount(dispatch, account)}>Account</Button>
              <Button onClick={(): void => logout()}>Log out</Button>
            </>
          ) : (
            <>
              <Button onClick={(): void => sendToLoginPage()}>Log in</Button>
              <Button onClick={(): void => navigate('/register')}>Register</Button>
              {process.env.NODE_ENV === 'development' ? (
                <Input
                  onChange={(e) => setCookie(e.target.value)}
                  onKeyDown={(e) => addCookie(e)}
                  placeholder="Enter cookie"
                />
              ) : undefined}
            </>
          )}
        </AccountPopup>
      ) : null}
    </AnimatePresence>
  );
};
