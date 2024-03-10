import { sendToLogoutPage } from '../clientApi';
import { removeTokens } from '../controllers/index';

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