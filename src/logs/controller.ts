import type { EUserRace } from '../enums/commands';
import type { IFullError } from '../types';
import type { IGetMessages } from '../types/messages';
import Cookies from '../tools/cookies';

export default class Controller {
  /**
   * Send request to create user profile
   */
  async createProfile(race: EUserRace): Promise<void> {
    const home = process.env.REACT_APP_HOME as string;
    const server = process.env.REACT_APP_BACKEND!;
    const accessToken = new Cookies().getToken('monsters.uid');

    const res = await fetch(`${server}/profile`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': home,
      },
      body: JSON.stringify({
        race,
      }),
    });

    if (res.ok) return;
    const err = (await res.json()) as IFullError;
    throw err;
  }

  /**
   * Send request to send new message
   */
  async sendMessage(body: string, receiver: string): Promise<void> {
    const server = process.env.REACT_APP_BACKEND!;
    const home = process.env.REACT_APP_HOME!;
    const accessToken = new Cookies().getToken('monsters.uid');

    const res = await fetch(`${server}/message/send`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': home,
      },
      body: JSON.stringify({
        receiver,
        body,
      }),
    });

    if (res.ok) return;
    const err = (await res.json()) as IFullError;
    throw err;
  }

  /**
   * Send request to get user messages
   */
  async getMessages(): Promise<Record<string, IGetMessages>> {
    const server = process.env.REACT_APP_BACKEND!;
    const home = process.env.REACT_APP_HOME!;
    const accessToken = new Cookies().getToken('monsters.uid');

    const res = await fetch(`${server}/message?page=1`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': home,
      },
    });

    if (res.ok) return (await res.json()) as Record<string, IGetMessages>;
    const err = (await res.json()) as IFullError;
    throw err;
  }
}
