import Cookies from '../../tools/cookies';
import * as controller from './controller';
import { ETokenNames, ETokenType } from '../../enums';

export const sendToLoginPage = (): void => {
  return controller.sendToLoginPage();
};

const removeTokens = async (): Promise<string> => {
  const cookies = new Cookies();
  const accessToken = cookies.getToken(ETokenNames.Access);
  const refreshToken = cookies.getToken(ETokenNames.Refresh);

  await controller.revokeToken(accessToken as string, ETokenType.Access);
  await controller.revokeToken(refreshToken as string, ETokenType.Refresh);

  cookies.removeToken(ETokenNames.Access);
  cookies.removeToken(ETokenNames.Refresh);

  return accessToken as string;
};

export const logout = (): void => {
  removeTokens()
    .then((accessToken) => {
      controller.sendToLogoutPage(accessToken);
      return undefined;
    })
    .catch((err) => {
      console.log("Couldn't remove user tokens");
      console.log(err);
    });
};
