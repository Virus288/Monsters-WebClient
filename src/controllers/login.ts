import Cookies from '../tools/cookies';
import { loginUser } from './index';
import { login } from '../clientApi';
import { getLogs, getMessages } from '../gameApi/gameApi';
import type { ILog, IPreparedMessagesBody } from '../types';

export const handleLogin = async (code: string): Promise<void> => {
  const { data } = await login(code);
  new Cookies().addLoginToken(data.access_token, data.expires_in);
  new Cookies().addRefreshToken(data.refresh_token, data.expires_in * 2);

  return loginUser(data.access_token);
};

export const initApp = async (
  addMessages: (messages: Record<string, IPreparedMessagesBody>) => void,
  addLogs: (logs: ILog[]) => void,
): Promise<void> => {
  const messages = await getMessages();
  const logs = await getLogs();

  addMessages(messages.data.data);
  addLogs(logs.data.data);

  console.log('logs');
  console.log(logs);
  console.log('messages');
  console.log(messages);
};
