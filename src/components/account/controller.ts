import type { IFullError } from '../../types';

export const logIn = async (login: string, password: string): Promise<void> => {
  const server = process.env.REACT_APP_BACKEND!;

  const res = await fetch(`${server}/users/login`, {
    method: 'POST',
    body: JSON.stringify({ login, password }),
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
