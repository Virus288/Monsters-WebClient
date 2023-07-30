import type React from 'react';
import type { IFullError, ILoginForm, IRegisterForm } from '../../types';
import * as controllers from './controller';

export const logIn = (
  e: React.FormEvent<ILoginForm>,
  setError: React.Dispatch<React.SetStateAction<string | undefined>>,
  setReady: React.Dispatch<React.SetStateAction<boolean>>,
): void => {
  e.preventDefault();
  const { username, password } = e.target as ILoginForm;

  controllers
    .logIn(username.value, password.value)
    .then((): void => {
      return setReady(true);
    })
    .catch((err) => {
      const error = err as IFullError;
      setError(error.message);
    });
};

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

export const preLogin = (
  setPreReady: React.Dispatch<React.SetStateAction<boolean>>,
  setReady: React.Dispatch<React.SetStateAction<boolean>>,
): void => {
  controllers
    .preLogin()
    .then((data): void => {
      if (data.id) {
        setReady(true);
        setPreReady(true);
      }
      return undefined;
    })
    .catch(() => setPreReady(true));
};
