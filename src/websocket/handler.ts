import type { ISocketNewMessage } from '../types';
import type { MainDispatch } from '../redux/types';
import * as hooks from '../redux';

export default class Handler {
  private readonly _dispatch: MainDispatch;

  constructor(dispatch: MainDispatch) {
    this._dispatch = dispatch;
  }

  private get dispatch(): MainDispatch {
    return this._dispatch;
  }

  handleMessage(message: ISocketNewMessage): void {
    this.dispatch(hooks.addLog({ message: `Received new message from ${message.sender}`, author: 1 }));
    setTimeout(() => {
      console.log('Sending message');
      this.dispatch(hooks.addLog({ message: message.body, author: 1 }));
    }, 2000);
  }
}
