import type { MainDispatch } from '../redux/types';
import * as hooks from '../redux';
import type { ISocketMessage, ISocketNewMessage } from '../types';
import { ESocketType } from '../enums';
import Handler from './handler';

export default class Controller {
  private readonly _dispatch: MainDispatch;

  private readonly _handler: Handler;

  constructor(dispatch: MainDispatch) {
    this._dispatch = dispatch;
    this._handler = new Handler(dispatch);
  }

  private _client: WebSocket | undefined;

  private get client(): WebSocket {
    return this._client as WebSocket;
  }

  private set client(value: WebSocket) {
    this._client = value;
  }

  private get handler(): Handler {
    return this._handler;
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
    this.client.onmessage = (msg: MessageEvent<unknown>): void => this.handleMessage(msg.data as string);
    this.client.onclose = (e): void => this.close(e.reason);
  }

  private handleMessage(msg: string): void {
    let parsed: ISocketMessage | Record<string, string> = {};

    try {
      parsed = JSON.parse(msg) as ISocketMessage;
    } catch (err) {
      console.log("Couldn't parse socket message");
      console.log('err');
      console.log(err);
    }

    console.log('New websocket message');
    console.log(parsed);

    switch (parsed.type as ESocketType) {
      case ESocketType.Message:
        this.handler.handleMessage(parsed.payload as ISocketNewMessage);
        break;
      default:
        console.log('Unknown websocket message');
        console.log(parsed);
        break;
    }
  }
}
