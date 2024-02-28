import type { AxiosResponse } from 'axios';
import clientApi from '../tools/axios';
import type { ETokenType } from '../enums/tokens';
import { generateRandomName } from '../tools';
import Cookies from '../tools/cookies';
import type { IRegisterFormValues } from '../types';

import type * as types from '../types/index';

export const userLogin = async (formData: { login: string; password: string }) => {
  const response = await clientApi.post('/debug/interaction', formData);
  return response.data;
};

export const sendToLoginPage = (): void => {
  const REDIRECT_URL = import.meta.env.VITE_API_REDIRECT_LOGIN_URL;
  const CLIENT_ID = import.meta.env.VITE_API_CLIENT_ID;

  const queryParams = new URLSearchParams({
    client_id: CLIENT_ID,
    response_type: 'code',
    redirect_uri: REDIRECT_URL,
    nonce: generateRandomName(),
    scope: 'openid',
  }).toString();
  window.location.href = `/auth?${queryParams}`;
};

export const getUserLogin = async (): Promise<{ login: string; sub: string }> => {
  const accessToken = new Cookies().getToken('monsters.uid');
  const response = await clientApi.get('/me', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

export const getUserProfile = async (name: string): Promise<types.IUserProfile> => {
  const accessToken = new Cookies().getToken('monsters.uid');
  const response = await clientApi.get(`/profile?name=${name}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

export const createAccount = async (formData: IRegisterFormValues) => {
  const response = await clientApi.post('/users/register', formData);
  return response.data;
};

export const login = async (code: string): Promise<AxiosResponse> => {
  const REDIRECT_URL = import.meta.env.VITE_API_REDIRECT_LOGIN_URL;
  const CLIENT_SECRET = import.meta.env.VITE_API_CLIENT_SECRET;
  const CLIENT_ID = import.meta.env.VITE_API_CLIENT_ID;

  const body = new URLSearchParams({
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    code,
    grant_type: 'authorization_code',
    redirect_uri: REDIRECT_URL,
  });

  const response = await clientApi.post('/token', body);

  return response;
};

export const refreshAccessToken = async (token: string): Promise<AxiosResponse> => {
  const CLIENT_SECRET = import.meta.env.VITE_API_CLIENT_SECRET;
  const CLIENT_ID = import.meta.env.VITE_API_CLIENT_ID;

  const body = new URLSearchParams({
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    refresh_token: token,
    grant_type: 'refresh_token',
  });

  const response = await clientApi.post('/token', body);

  return response;
};

export const revokeToken = async (token: string, type: ETokenType): Promise<AxiosResponse> => {
  const CLIENT_SECRET = import.meta.env.VITE_API_CLIENT_SECRET;
  const CLIENT_ID = import.meta.env.VITE_API_CLIENT_ID;

  const body = new URLSearchParams({
    token,
    token_type_hint: type,
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
  });

  const response = await clientApi.post('/token/revocation', body);
  return response;
};