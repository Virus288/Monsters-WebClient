import type { AxiosHeaders, AxiosInstance } from 'axios';
import axios from 'axios';
import Cookies from './cookies';
import { ETokenNames } from '../enums';

const apiUrl = import.meta.env.VITE_API_BACKEND as string;
const homeUrl = import.meta.env.VITE_API_HOME as string;

const getHttpClient = (params?: { noToken: boolean }): AxiosInstance => {
  const loginToken = new Cookies().getToken(ETokenNames.Access);
  const headers: Partial<AxiosHeaders> = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Access-Control-Allow-Origin': homeUrl,
  };
  if (loginToken && params?.noToken !== true) headers.Authorization = `Bearer ${loginToken}`;

  return axios.create({
    baseURL: apiUrl,
    withCredentials: true,
    headers,
  });
};

export default getHttpClient;
