import axios from 'axios';
import Cookies from './cookies';

const API_BASE_URL = import.meta.env.VITE_API_BACKEND;

const HOME_URL = import.meta.env.VITE_API_HOME;
const accessToken = new Cookies().getToken('monsters.uid');

const clientApi = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/x-www-form-urlencoded',
    'Access-Control-Allow-Origin': HOME_URL,
  },
});

export default clientApi;
