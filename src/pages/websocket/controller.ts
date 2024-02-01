import type { MainDispatch } from '../../redux/types';
import * as hooks from '../../redux';

export default class Controller {
  private readonly _dispatch: MainDispatch;

  constructor(dispatch: MainDispatch) {
    this._dispatch = dispatch;
  }

  private _client: WebSocket | undefined;

  private get client(): WebSocket {
    return this._client as WebSocket;
  }

  private set client(value: WebSocket) {
    this._client = value;
  }

  private get dispatch(): MainDispatch {
    return this._dispatch;
  }

  init(): void {
    const server = process.env.REACT_APP_WS_BACKEND!;
    this.client = new WebSocket(server);

    this.startListeners();
  }

  close(reason?: string): void {
    if (!this._client) return;
    this._client.close();
    this._client = undefined;

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
    this.dispatch(hooks.disconnectWebsocket());
  }

  // private send(msg: unknown): void {
  //   this._client!.send(JSON.stringify(msg));
  // }

  private startListeners(): void {
    this.client.onopen = (): void => {
      this.dispatch(hooks.connectWebsocket());
    };
    this.client.onerror = (err): void => {
      console.log(err);
      this.dispatch(hooks.disconnectWebsocket());
    };
    this.client.onmessage = (msg: MessageEvent<unknown>): void => this.handleMessage(msg);
    this.client.onclose = (e): void => this.close(e.reason);
  }

  private handleMessage(msg: MessageEvent<unknown>): void {
    console.log('New websocket nessage');
    console.log(msg.data);
  }
}
