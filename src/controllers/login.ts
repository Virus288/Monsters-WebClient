import Cookies from '../tools/cookies';
import type { ILog, IPreparedMessagesBody, IUserProfile } from '../types';
import { useAccountStore, useProfileStore } from '../zustand/store';
import { getLogs, getMessages, getUserLogin, getUserProfile, login } from '../communication';

export const loginUser = async (): Promise<void> => {
  const { setAccount } = useAccountStore.getState();
  const { setProfile } = useProfileStore.getState();
  const { setIsLoggedIn } = useAccountStore.getState();

  const data = await getUserLogin();
  const profile = await getUserProfile(data.data.login);

  setAccount({ id: data.data.sub, login: data.data.login });
  setProfile(profile.data?.data as IUserProfile);
  setIsLoggedIn(true);
};

export const handleLogin = async (code: string): Promise<void> => {
  const { data } = await login(code);
  new Cookies().addLoginToken(data.access_token, data.expires_in);
  new Cookies().addRefreshToken(data.refresh_token, data.expires_in * 2);

  await loginUser();
};

export const initApp = async (
  addMessages: (messages: Record<string, IPreparedMessagesBody>) => void,
  addLogs: (logs: ILog[]) => void,
): Promise<void> => {
  const messages = await getMessages();
  const logs = await getLogs();

  addMessages(messages.data.data);
  addLogs(logs.data.data);
};
