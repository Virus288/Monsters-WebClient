import type { ISocketMessage, ISocketNewMessage } from '../types';
import { ESocketType } from '../enums';
import { saveLog } from '../communication';

export default class Controller {
  private readonly _add: (target: string, message: string) => Promise<void>;

  constructor(add: (target: string, message: string) => void) {
    this._add = (target: string, command: string): Promise<void> => this.prepareAdd(add, target, command);
  }

  private _client: WebSocket | undefined;

  private get client(): WebSocket {
    return this._client as WebSocket;
  }

  private set client(value: WebSocket) {
    this._client = value;
  }

  private get add(): (target: string, message: string) => Promise<void> {
    return this._add;
  }

  init(): void {
    const server = import.meta.env.VITE_API_WS_BACKEND as string;
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
  }

  private startListeners(): void {
    this.client.onopen = (): void => {
      console.log('websocket connected');
    };
    this.client.onerror = (err): void => {
      console.log(err);
    };
    this.client.onmessage = (msg: MessageEvent<unknown>): void => {
      this.handleMessage(msg.data as string).catch((err) => {
        console.log('Got error with websocket message', err);
      });
    };
    this.client.onclose = (e): void => this.close(e.reason);
  }

  private async handleMessage(msg: string): Promise<void> {
    let parsed: ISocketMessage | Record<string, string> = {};

    try {
      parsed = JSON.parse(msg) as ISocketMessage;
    } catch (err) {
      console.log("Couldn't parse socket message");
      console.log('err');
      console.log(err);
    }

    switch (parsed.type as ESocketType) {
      case ESocketType.Message:
        await this.handleUserMessage(parsed.payload as ISocketNewMessage);
        break;
      default:
        console.log('Unknown websocket message');
        console.log(parsed);
        break;
    }
  }

  private async handleUserMessage(message: ISocketNewMessage): Promise<void> {
    await this.add('System', 'Received new message');
    await this.add(message.sender, message.body);
  }

  private async prepareAdd(
    add: (target: string, command: string) => void,
    target: string,
    input: string,
  ): Promise<void> {
    add(target, input);
    await saveLog(target, input);
  }
}
