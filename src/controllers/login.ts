import Cookies from '../tools/cookies';
import { loginUser } from './index';
import { login } from '../clientApi';

// eslint-disable-next-line import/prefer-default-export
export const handleLogin = async (code: string): Promise<void> => {
  const { data } = await login(code);
  new Cookies().addLoginToken(data.access_token, data.expires_in);
  new Cookies().addRefreshToken(data.refresh_token, data.expires_in * 2);

  return loginUser(data.access_token);
};
