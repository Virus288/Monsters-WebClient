import type { ISocketMessage } from '../../types/websocket';
import { EMessageSubTargets, ESocketTargets } from '../../enums';
import type { ISocketAuction, MainDispatch } from '../../redux/types';
import * as hooks from '../../redux';

export default class Communicator {
  client: WebSocket | undefined;

  private readonly _dispatch: MainDispatch;

  constructor(dispatch: MainDispatch) {
    this._dispatch = dispatch;
  }

  private get dispatch(): MainDispatch {
    return this._dispatch;
  }

  init(): void {
    this.close();
    const server = process.env.REACT_APP_WS_BACKEND!;
    this.client = new WebSocket(server);

    this.startListeners(this.client);
  }

  close(reason?: string): void {
    if (!this.client) return;
    this.client.close();
    this.client = undefined;

    if (reason) {
      let r: { type: 'error'; payload: Record<string, unknown> } | string = reason;
      try {
        r = JSON.parse(r) as { type: 'error'; payload: Record<string, unknown> };
      } catch (err) {
        // ignored
      }
      console.log('Socket closed');
      console.log(r);
    }
    this.dispatch(hooks.disconnect());
  }

  getChatMessages(): void {
    const msg: ISocketMessage = {
      payload: { page: 0 },
      subTarget: EMessageSubTargets.Get,
      target: ESocketTargets.Chat,
    };
    this.send(msg);
  }

  sendChatMessage(action: ISocketAuction): void {
    const payload = action.payload as { message: string; target: string };

    const msg: ISocketMessage = {
      payload: { message: payload.message, target: payload.target },
      subTarget: EMessageSubTargets.Send,
      target: ESocketTargets.Chat,
    };
    this.send(msg);
  }

  private send(msg: ISocketMessage): void {
    this.client!.send(JSON.stringify(msg));
  }

  private startListeners(client: WebSocket): void {
    client.onopen = (): void => {
      this.dispatch(hooks.connect());
    };
    client.onerror = (err): void => {
      console.log(err);
      this.dispatch(hooks.disconnect());
    };
    client.onmessage = (msg: MessageEvent<unknown>): void => this.handleMessage(msg);
    client.onclose = (e): void => this.close(e.reason);
  }

  private handleMessage(msg: MessageEvent<unknown>): void {
    console.log(msg.data);
  }
}
