import type { EUserRace } from '../enums/commands/races';
import type { IFullError } from '../types';

export default class Controller {
  async createProfile(race: EUserRace): Promise<void> {
    const server = process.env.REACT_APP_BACKEND!;

    const res = await fetch(`${server}/profile`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        race,
      }),
    });

    if (res.ok) return;
    const err = (await res.json()) as IFullError;
    throw err;
  }
}
