import type { AxiosError, AxiosResponse } from 'axios';
import getHttpClient from '../tools/axios';
import type { ETokenType, EUserRace } from '../enums';
import type * as types from '../types';
import { generateRandomName } from '../tools';

export const sendMessage = async (receiver: string, body: string): Promise<AxiosResponse<types.IDefaultResponse>> => {
  try {
    return await getHttpClient().post('/message/send', { body, receiver });
  } catch (err) {
    throw new Error((err as AxiosError<{ error: Error }>).response!.data.error.message);
  }
};

export const getMessages = async (): Promise<AxiosResponse<types.IGetMessages>> => {
  try {
    return await getHttpClient().get('message?page=1');
  } catch (err) {
    throw new Error((err as AxiosError<{ error: Error }>).response!.data.error.message);
  }
};

export const getLogs = async (): Promise<AxiosResponse<types.IGetLogs>> => {
  try {
    return await getHttpClient().get('logs');
  } catch (err) {
    throw new Error((err as AxiosError<{ error: Error }>).response!.data.error.message);
  }
};

export const initProfile = async (race: EUserRace): Promise<AxiosResponse<types.IDefaultResponse>> => {
  try {
    return await getHttpClient().post('/profile', { race });
  } catch (err) {
    throw new Error((err as AxiosError<{ error: Error }>).response!.data.error.message);
  }
};

export const attack = async (target: string): Promise<AxiosResponse<types.IGetAttack>> => {
  try {
    return await getHttpClient().post('/fights/attack', { target });
  } catch (err) {
    throw new Error((err as AxiosError<{ error: Error }>).response!.data.error.message);
  }
};

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

export const sendToLogoutPage = (token: string): void => {
  const redirectUrl = import.meta.env.VITE_API_HOME as string;
  const clientId = import.meta.env.VITE_API_CLIENT_ID as string;
  const server = import.meta.env.VITE_API_BACKEND as string;

  // eslint-disable-next-line compat/compat
  const params = new URLSearchParams({
    id_token_hint: token,
    post_logout_redirect_uri: redirectUrl,
    client_id: clientId,
  }).toString();
  window.location.href = `${server}/session/end?${params}`;
};

export const getUserLogin = async (): Promise<AxiosResponse<types.IGetLogin>> => {
  try {
    return await getHttpClient().get('/me');
  } catch (err) {
    throw new Error((err as AxiosError<{ error: Error }>).response!.data.error.message);
  }
};

export const getUserProfile = async (name: string): Promise<AxiosResponse<types.IGetProfile>> => {
  try {
    return await getHttpClient().get(`/profile?name=${name}`);
  } catch (err) {
    throw new Error((err as AxiosError<{ error: Error }>).response!.data.error.message);
  }
};

export const createAccount = async (
  formData: types.IRegisterFormValues,
): Promise<AxiosResponse<types.IDefaultResponse>> => {
  try {
    return await getHttpClient().post('/users/register', formData);
  } catch (err) {
    throw new Error((err as AxiosError<{ error: Error }>).response!.data.error.message);
  }
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

  try {
    return await getHttpClient().post('/token', body);
  } catch (err) {
    throw new Error((err as AxiosError<{ error: Error }>).response!.data.error.message);
  }
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

  try {
    return await getHttpClient().post('/token', body);
  } catch (err) {
    throw new Error((err as AxiosError<{ error: Error }>).response!.data.error.message);
  }
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

  try {
    return await getHttpClient({ noToken: true }).post('/token/revocation', body);
  } catch (err) {
    throw new Error((err as AxiosError<{ error: Error }>).response!.data.error.message);
  }
};

export const initFight = async (
  fightFormData: types.IFightFormData,
): Promise<AxiosResponse<types.IDefaultResponse>> => {
  try {
    return await getHttpClient().post('debug/fights/create', fightFormData);
  } catch (err) {
    throw new Error((err as AxiosError<{ error: Error }>).response!.data.error.message);
  }
};

export const handleBugReport = async (): Promise<void> => {
  // eslint-disable-next-line compat/compat
  return new Promise((resolve) => {
    console.log('BUG REPORT HAS BEEN SEND');
    resolve(undefined);
  });
};
