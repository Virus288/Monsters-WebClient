import axios from 'axios';
import Cookies from './cookies';

const apiUrl = import.meta.env.VITE_API_BACKEND as string;
const homeUrl = import.meta.env.VITE_API_HOME as string;

const accessToken = new Cookies().getToken('monsters.uid');

const headers = {
  'Content-Type': 'application/x-www-form-urlencoded',
  'Access-Control-Allow-Origin': homeUrl,
};

export const basicClient = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
  headers,
});

export const loggedClient = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
  headers: {
    ...headers,
    Authorization: `Bearer ${accessToken}`,
  },
});
