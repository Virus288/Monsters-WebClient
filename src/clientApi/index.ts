import type { AxiosResponse } from 'axios';
import clientApi from '../tools/axios';
import type { ETokenType } from '../enums';
import { generateRandomName } from '../tools';
import Cookies from '../tools/cookies';


import type * as types from '../types';

export const userLogin = async (formData: { login: string; password: string }): Promise<unknown> => {
  const response = await clientApi.post('/debug/interaction', formData);
  return response.data as unknown;
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


export const getUserLogin = async (): Promise<{ login: string; sub: string }> => {
  const accessToken = new Cookies().getToken('monsters.uid');
  const response = await clientApi.get('/me', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data as { login: string; sub: string };
};

export const getUserProfile = async (name: string): Promise<types.IUserProfile> => {
  const accessToken = new Cookies().getToken('monsters.uid');
  const response = await clientApi.get(`/profile?name=${name}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data as types.IUserProfile;
};

export const createAccount = async (formData: types.IRegisterFormValues): Promise<unknown> => {
  const response = await clientApi.post('/users/register', formData);
  return response.data as unknown;
};

export const login = async (code: string): Promise<ILoginBody> => {
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
  const data = await clientApi.post('/token', body);
  console.log(data.data);
  return data.data;
};

export const refreshAccessToken = async (token: string): Promise<AxiosResponse> => {
  const clientSecret = import.meta.env.VITE_API_CLIENT_SECRET as string;
  const clientId = import.meta.env.VITE_API_CLIENT_ID as string;

  // eslint-disable-next-line compat/compat
  const body = new URLSearchParams({
    client_id: clientId,
    client_secret: clientSecret,
    refresh_token: token,
    grant_type: 'refresh_token',
  });

  return clientApi.post('/token', body);
};

export const revokeToken = async (token: string, type: ETokenType): Promise<AxiosResponse> => {
  const clientSecret = import.meta.env.VITE_API_CLIENT_SECRET as string;
  const clientId = import.meta.env.VITE_API_CLIENT_ID as string;

  // eslint-disable-next-line compat/compat
  const body = new URLSearchParams({
    token,
    token_type_hint: type,
    client_id: clientId,
    client_secret: clientSecret,
  });

  return clientApi.post('/token/revocation', body);
};


type IFightFormData = {
  team: string[];
}




export const initFight = async (fightFormdata: IFightFormData): Promise<void> => {
  const response = await clientApi.post('debug/fights/create', fightFormdata);
  return response.data;
}


