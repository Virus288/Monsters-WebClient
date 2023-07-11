import type { IFullError, IPreLoginBody } from '../../types';

export const logIn = async (login: string, password: string): Promise<void> => {
  const server = process.env.REACT_APP_BACKEND!;

  const res = await fetch(`${server}/users/login`, {
    method: 'POST',
    body: JSON.stringify({ login, password }),
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (res.ok) {
    return;
  }
  const err = (await res.json()) as IFullError;
  throw err;
};

export const register = async (login: string, password: string, email: string): Promise<void> => {
  const server = process.env.REACT_APP_BACKEND!;

  const res = await fetch(`${server}/users/register`, {
    method: 'POST',
    body: JSON.stringify({ login, password, email }),
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (res.ok) {
    return;
  }
  const err = (await res.json()) as IFullError;
  throw err;
};

export const preLogin = async (): Promise<IPreLoginBody> => {
  const server = process.env.REACT_APP_BACKEND!;

  const res = await fetch(`${server}/users/login`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (res.ok) {
    return (await res.json()) as IPreLoginBody;
  }
  const err = (await res.json()) as IFullError;
  throw err;
};
