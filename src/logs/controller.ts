import type { EUserRace } from '../enums/commands';
import type { IFullError } from '../types';
import type { IGetMessages } from '../types/messages';
import Cookies from '../tools/cookies';

export default class Controller {
  async createProfile(race: EUserRace): Promise<void> {
    const accessToken = new Cookies().getToken('monsters.uid');
    const home = process.env.REACT_APP_HOME as string;
    const server = process.env.REACT_APP_BACKEND!;

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

  async sendMessage(body: string, receiver: string): Promise<void> {
    const accessToken = new Cookies().getToken('monsters.uid');
    const server = process.env.REACT_APP_BACKEND!;
    const home = process.env.REACT_APP_HOME!;

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

  async getMessages(): Promise<Record<string, IGetMessages>> {
    const accessToken = new Cookies().getToken('monsters.uid');
    const server = process.env.REACT_APP_BACKEND!;
    const home = process.env.REACT_APP_HOME!;

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
