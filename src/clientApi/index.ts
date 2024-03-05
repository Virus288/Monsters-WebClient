import type { AxiosResponse } from 'axios';
import { basicClient, loggedClient } from '../tools/axios';
import type { ETokenType } from '../enums';
import { generateRandomName } from '../tools';
import type * as types from '../types';

export const sendToLoginPage = (): void => {
  const redirectUrl = import.meta.env.VITE_API_REDIRECT_LOGIN_URL as string;
  const clientId = import.meta.env.VITE_API_CLIENT_ID as string;
  const server = import.meta.env.VITE_API_BACKEND as string;
  // eslint-disable-next-line compat/compat
  const queryParams = new URLSearchParams({
    client_id: clientId,
    response_type: 'code',
    redirect_uri: redirectUrl,
    nonce: generateRandomName(),
    scope: 'openid',
  }).toString();
  window.location.href = `${server}/auth?${queryParams}`;
};

export const getUserLogin = async (): Promise<AxiosResponse<types.IGetLogin>> => {
  return loggedClient.get('/me');
};

export const getUserProfile = async (name: string): Promise<AxiosResponse<types.IGetProfile>> => {
  return loggedClient.get(`/profile?name=${name}`);
};

export const createAccount = async (
  formData: types.IRegisterFormValues,
): Promise<AxiosResponse<types.IDefaultResponse>> => {
  return basicClient.post('/users/register', formData);
};

export const login = async (code: string): Promise<AxiosResponse<types.IGetToken>> => {
  const redirectUrl = import.meta.env.VITE_API_REDIRECT_LOGIN_URL as string;
  const clientSecret = import.meta.env.VITE_API_CLIENT_SECRET as string;
  const clientId = import.meta.env.VITE_API_CLIENT_ID as string;

  // eslint-disable-next-line compat/compat
  const body = new URLSearchParams({
    client_id: clientId,
    client_secret: clientSecret,
    code,
    grant_type: 'authorization_code',
    redirect_uri: redirectUrl,
  });
  return basicClient.post('/token', body);
};

export const refreshAccessToken = async (token: string): Promise<AxiosResponse<types.IDefaultResponse>> => {
  const clientSecret = import.meta.env.VITE_API_CLIENT_SECRET as string;
  const clientId = import.meta.env.VITE_API_CLIENT_ID as string;

  // eslint-disable-next-line compat/compat
  const body = new URLSearchParams({
    client_id: clientId,
    client_secret: clientSecret,
    refresh_token: token,
    grant_type: 'refresh_token',
  });

  return basicClient.post('/token', body);
};

export const revokeToken = async (token: string, type: ETokenType): Promise<AxiosResponse<types.IDefaultResponse>> => {
  const clientSecret = import.meta.env.VITE_API_CLIENT_SECRET as string;
  const clientId = import.meta.env.VITE_API_CLIENT_ID as string;

  // eslint-disable-next-line compat/compat
  const body = new URLSearchParams({
    token,
    token_type_hint: type,
    client_id: clientId,
    client_secret: clientSecret,
  });

  return basicClient.post('/token/revocation', body);
};

export const initFight = async (
  fightFormdata: types.IFightFormData,
): Promise<AxiosResponse<types.IDefaultResponse>> => {
  return basicClient.post('debug/fights/create', fightFormdata);
};
