import { getUserLogin, getUserProfile } from '../clientApi/index';
import Cookies from '../tools/cookies';

import { useAccountStore, useProfileStore } from '../zustand/store';


const { setAccount } = useAccountStore.getState();
const { setProfile } = useProfileStore.getState();
const { setIsLoggedIn } = useAccountStore.getState();


export const addCookie = (cookie: string): void => {
  console.log('Adding cookie. Please refresh the page after adding');
  new Cookies().addLoginToken(cookie ?? '', Date.now() + 1000 * 60 * 24 * 30);
};


export const loginUser = async (cookie: string) => {
  new Cookies().addLoginToken(cookie, Date.now() + 1000 * 60 * 24 * 30);
  const data = await getUserLogin();

  const profile = await getUserProfile(data.login);



  setAccount({ id: data.sub, login: data.login });
  setProfile(profile);
  setIsLoggedIn(true);


  // await getUserProfile(data.id)
};