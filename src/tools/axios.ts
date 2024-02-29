import axios from 'axios';
import Cookies from './cookies';

const apiUrl = import.meta.env.VITE_API_BACKEND as string;

const homeUrl = import.meta.env.VITE_API_HOME as string;
const accessToken = new Cookies().getToken('monsters.uid');

const clientApi = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/x-www-form-urlencoded',
    'Access-Control-Allow-Origin': homeUrl,
  },
});

export default clientApi;
