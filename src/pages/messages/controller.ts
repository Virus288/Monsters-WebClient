import type { IDetailedMessage } from '../../types/messages';
import type { IFullError } from '../../types';

export default class Controller {
  async getMessage(target: string): Promise<IDetailedMessage> {
    const server = process.env.REACT_APP_BACKEND!;

    const res = await fetch(`${server}/message?page=1&target=${target}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (res.ok) return (await res.json()) as IDetailedMessage;
    const err = (await res.json()) as IFullError;
    throw err;
  }
}
