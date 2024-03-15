import { Cookies } from '../tools';
import { ETokenNames, ETokenType } from '../enums';
import { revokeToken, sendToLogoutPage } from '../communication';

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

// eslint-disable-next-line import/prefer-default-export
export const logout = (): void => {
  removeTokens()
    .then((accessToken) => {
      sendToLogoutPage(accessToken);
      return undefined;
    })
    .catch((err) => {
      console.log("Couldn't remove user tokens");
      console.log(err);
    });
};
