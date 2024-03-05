import { getUserLogin, getUserProfile } from '../clientApi';
import Cookies from '../tools/cookies';
import { useAccountStore, useProfileStore } from '../zustand/store';

// eslint-disable-next-line import/prefer-default-export
export const loginUser = async (cookie: string): Promise<void> => {
  new Cookies().addLoginToken(cookie, Date.now() + 1000 * 60 * 24 * 30);

  const { setAccount } = useAccountStore.getState();
  const { setProfile } = useProfileStore.getState();
  const { setIsLoggedIn } = useAccountStore.getState();

  const data = await getUserLogin();
  const profile = await getUserProfile(data.data.login);

  setAccount({ id: data.data.sub, login: data.data.login });
  setProfile(profile.data);
  setIsLoggedIn(true);
};
