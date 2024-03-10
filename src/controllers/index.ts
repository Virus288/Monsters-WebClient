import { getUserLogin, getUserProfile, revokeToken } from '../clientApi';
import { ETokenNames, ETokenType } from '../enums';
import Cookies from '../tools/cookies';
import { IUserProfile } from '../types';
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
  setProfile(profile.data?.data as IUserProfile);
  setIsLoggedIn(true);
};


export const removeTokens = async (): Promise<string> => {
  const cookies = new Cookies();
  const accessToken = cookies.getToken(ETokenNames.Access);
  const refreshToken = cookies.getToken(ETokenNames.Refresh);

  await revokeToken(accessToken as string, ETokenType.Access);
  await revokeToken(refreshToken as string, ETokenType.Refresh);

  cookies.removeToken(ETokenNames.Access);
  cookies.removeToken(ETokenNames.Refresh);

  return accessToken as string;
};