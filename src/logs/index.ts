import type React from 'react';
import { ECharacterState } from '../enums/characterStates';
import type { MainDispatch } from '../redux/types';
import * as hooks from '../redux';
import Handler from './handler';
import { EUserRace } from '../enums/commands/races';
import type { IFullError, IUserProfile } from '../types';

export default class LogsController {
  private readonly _handler: Handler;

  private readonly _dispatch: MainDispatch;

  private readonly _profile: IUserProfile;

  constructor(dispatch: MainDispatch, profile: IUserProfile) {
    this._dispatch = dispatch;
    this._profile = profile;
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

  private get profile(): IUserProfile {
    return this._profile;
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
        return Object.values(EUserRace);
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

    setMessage('');
    this.dispatch(hooks.addLog({ message: input, author: 0 }));

    const availableCommands = this.getAvailableCommands().map((c) => c.toLowerCase());

    if (!availableCommands.includes(input.toLowerCase())) {
      this.dispatch(
        hooks.addLog({
          message: "Invalid input. You can use 'help' to gain more information about available commands",
          author: 1,
        }),
      );
      return;
    }

    this.handler
      .handleUserCommand(input.toLowerCase(), this.characterState)
      .then(() => {
        switch (this.characterState) {
          case ECharacterState.Registration:
            return this.finishRegistration();
          default:
            // #TODO Add some kind of help menu, which will allow user to send debug code if this happened
            return this.dispatch(
              hooks.addLog({
                message: 'Your character seems to be in unknown state. This should never happened',
                author: 1,
              }),
            );
        }
      })
      .catch((err) => {
        this.dispatch(hooks.addLog({ message: (err as IFullError).message, author: 1 }));
      });
  }

  async init(logs: { log: string; author: string | number }[]): Promise<void> {
    console.log(`All logs: ${logs.length}`);
    return new Promise((resolve) => {
      if (!this.profile.initialized) {
        this.handler.getRegisterLogs();
        this.changeCharacterState(ECharacterState.Registration);
      } else {
        // Placeholder for now. Backend is not yet ready
        // await this.fetchLogs();
      }

      resolve();
    });
  }

  private finishRegistration(): void {
    const data = [
      "It seems I got everything I need. Here's your adventurer plate.",
      '[Your receive bronze adventurer plate]',
      'Whenever you are free, you can undertake quests to earn valuable rewards and coins. Quests come and go, but you should be able to find something for yourself. Good luck and take care of yourself. We lost too many people this year',
    ];

    data.forEach((message) => this.dispatch(hooks.addLog({ message, author: 1 })));
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
