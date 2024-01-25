import type { MainDispatch } from '../redux/types';
import * as hooks from '../redux';
import Controller from './controller';
import { ECharacterState } from '../enums/characterStates';
import type { EUserRace } from '../enums/commands/races';

export default class Handler {
  private readonly _dispatch: MainDispatch;

  private readonly _controller: Controller;

  constructor(dispatch: MainDispatch) {
    this._dispatch = dispatch;
    this._controller = new Controller();
  }

  private get dispatch(): MainDispatch {
    return this._dispatch;
  }

  private get controller(): Controller {
    return this._controller;
  }

  getRegisterLogs(): void {
    const data = [
      'Hi. My name is Jessica. Welcome to our adventure guild. In order to register as an adventurer, I need you to provide me with some information. Please fill out this form.',
      '[You received registration form]',
      "First question is 'What your race ?'",
    ];

    data.forEach((message) => this.dispatch(hooks.addLog({ message, author: 1 })));
  }

  async handleUserCommand(input: string, characterState: ECharacterState): Promise<void> {
    switch (characterState) {
      case ECharacterState.Registration:
        await this.controller.createProfile(input as EUserRace);
        return;
      default:
        this.dispatch(hooks.addLog({ message: `Unknown command ${input}`, author: 1 }));
    }
  }
}
