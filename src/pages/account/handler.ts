import type React from 'react';
import type { IFullError, IRegisterForm } from '../../types';
import * as controllers from './controller';
import { getProfile, refreshAccessToken } from './controller';
import * as hooks from '../../redux';
import type { MainDispatch } from '../../redux/types';
import Cookies from '../../tools/cookies';

export const register = (
  e: React.FormEvent<IRegisterForm>,
  setError: React.Dispatch<React.SetStateAction<string | undefined>>,
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>,
): void => {
  e.preventDefault();
  const { username, password, email, password2 } = e.target as IRegisterForm;

  if (password2.value !== password.value) {
    setError('Passwords are not the same');
    return;
  }

  controllers
    .register(username.value, password.value, email.value)
    .then((): void => {
      return setSuccess(true);
    })
    .catch((err) => {
      const error = err as IFullError;
      setError(error.message);
    });
};

export const preLogin = async (dispatch: MainDispatch): Promise<void> => {
  if (window.location.pathname === '/login') return;

  const cookies = new Cookies();
  const accessToken = cookies.getToken('monsters.uid');
  const refreshToken = cookies.getToken('monsters.ref');
  if (!accessToken && !refreshToken) return;

  if (!accessToken) {
    try {
      await refreshAccessToken(refreshToken as string);
    } catch (err) {
      console.log("Couldn't refresh user token");
      console.log(err);
      cookies.removeToken('monsters.ref');
      throw err;
    }
  }

  const data = await controllers.getUserLogin();
  if (data?.login) {
    const profile = await getProfile(data?.sub);
    dispatch(hooks.addProfile(profile));
    dispatch(hooks.logIn({ userName: data?.login, id: data?.sub }));
  }
};

export const logIn = async (code: string, dispatch: MainDispatch): Promise<void> => {
  const data = await controllers.login(code);
  new Cookies().addLoginToken(data?.access_token as string, data?.expires_in as number);
  new Cookies().addRefreshToken(data?.refresh_token as string, (data?.expires_in as number) * 2); // #TODO RefreshToken has no 'expires in' in req. Using access_token value'

  const userLogin = await controllers.getUserLogin();
  if (userLogin?.login) {
    const profile = await getProfile(userLogin?.sub);
    dispatch(hooks.addProfile(profile));
    dispatch(hooks.logIn({ userName: userLogin?.login, id: userLogin?.sub }));
  }
};
