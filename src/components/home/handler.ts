import Cookies from '../../tools/cookies';
import * as controller from './controller';
import { ETokenType } from '../../enums';
import type { MainDispatch } from '../../redux/types';
import * as hooks from '../../redux';

export const sendToLoginPage = (): void => {
  return controller.sendToLoginPage();
};

const removeTokens = async (): Promise<void> => {
  const cookies = new Cookies();
  const accessToken = cookies.getToken('monsters.uid');
  const refreshToken = cookies.getToken('monsters.ref');

  await controller.revokeToken(accessToken as string, ETokenType.Access);
  await controller.revokeToken(refreshToken as string, ETokenType.Refresh);
};

export const logout = (dispatch: MainDispatch): void => {
  removeTokens()
    .then(() => {
      dispatch(hooks.logOut());
      return undefined;
    })
    .catch((err) => {
      console.log("Couldn't remove user tokens");
      console.log(err);
    });
};
