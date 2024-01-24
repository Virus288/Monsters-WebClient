import type React from 'react';
import { ECharacterState } from '../enums/characterStates';
import type { MainDispatch } from '../redux/types';
import * as hooks from '../redux';
import Handler from './handler';

export default class LogsController {
  private readonly _handler: Handler;

  private readonly _dispatch: MainDispatch;

  constructor(dispatch: MainDispatch) {
    this._dispatch = dispatch;
    this._handler = new Handler(dispatch);
  }

  private get handler(): Handler {
    return this._handler;
  }

  private _characterState: ECharacterState | null = null;

  private get characterState(): ECharacterState {
    return this._characterState as ECharacterState;
  }

  private set characterState(value: ECharacterState) {
    this._characterState = value;
  }

  private get dispatch(): MainDispatch {
    return this._dispatch;
  }

  changeCharacterState(state: ECharacterState): void {
    this.characterState = state;
  }

  getAvailableCommands(): string[] {
    switch (this.characterState) {
      case ECharacterState.Registration:
        return Object.values(ECharacterState);
      default:
        return [''];
    }
  }

  sendLogOnEnter(
    e: React.KeyboardEvent<HTMLInputElement>,
    canWrite: boolean,
    setMessage: React.Dispatch<React.SetStateAction<string>>,
  ): void {
    if (e.key !== 'Enter') return;
    this.sendLog((e.target as HTMLInputElement).value, canWrite, setMessage);
  }

  sendLog(input: string, canWrite: boolean, setMessage: React.Dispatch<React.SetStateAction<string>>): void {
    if (!canWrite) return;

    console.log('Send logs');
    console.log(canWrite);
    console.log('input');
    console.log(input);
    setMessage('');
    this.dispatch(hooks.addLog({ message: input, author: 0 }));
    // const availableCommands = this.getAvailableCommands().map((c) => c.toLowerCase());
    //
    // if (!availableCommands.includes(command.toLowerCase())) {
    //   this.dispatch(hooks.addLog({ message: 'Invalid input' }));
    //   return;
    // }
    //
    // this.handler.handleUserCommand(command, this.characterState).catch((err) => {
    //   this.dispatch(hooks.addLog({ message: (err as IFullError).message }));
    // });
  }

  async init(logs: { log: string; author: string | number }[]): Promise<void> {
    console.log(`All logs: ${logs.length}`);
    return new Promise((resolve) => {
      // Placeholder for now. Backend is not yet ready
      this.handler.getRegisterLogs();
      this.changeCharacterState(ECharacterState.Registration);
      resolve();
    });
    // if (logs.length === 0) {
    //   await this.fetchLogs();
    // }
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  private async fetchLogs(): Promise<void> {
    // This function will fetch last x logs from server, alongside player's status, which defines what actions he can do
    // It should use this.dispatch to send logs
    return new Promise((resolve) => {
      resolve();
    });
  }
}
