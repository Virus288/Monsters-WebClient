import type { MainDispatch } from '../redux/types';
import * as hooks from '../redux';
import Controller from './controller';
import type * as commands from '../enums/commands';
import * as enums from '../enums';
import type { IGetMessages } from '../types/messages';
import type { IActionParams } from '../types';

export default class Handler {
  private readonly _dispatch: MainDispatch;

  private readonly _controller: Controller;

  private readonly _changeCharacterState: (state: enums.ECharacterState) => void;

  constructor(dispatch: MainDispatch, changeCharacterState: (state: enums.ECharacterState) => void) {
    this._dispatch = dispatch;
    this._controller = new Controller();
    this._changeCharacterState = changeCharacterState;
  }

  private _actionParams: IActionParams = { sendMessageTo: undefined };

  private get actionParams(): IActionParams {
    return this._actionParams;
  }

  private _previousCharacterState: enums.ECharacterState | undefined = undefined;

  private get previousCharacterState(): enums.ECharacterState | undefined {
    return this._previousCharacterState;
  }

  private set previousCharacterState(value: enums.ECharacterState | undefined) {
    this._previousCharacterState = value;
  }

  private get changeCharacterState(): (state: enums.ECharacterState) => void {
    return this._changeCharacterState;
  }

  private get dispatch(): MainDispatch {
    return this._dispatch;
  }

  private get controller(): Controller {
    return this._controller;
  }

  savePreviousCharacterState(characterState: enums.ECharacterState): void {
    this.previousCharacterState = characterState;
  }

  restorePreviousCharacterState(): void {
    this.changeCharacterState(this.previousCharacterState as enums.ECharacterState);
  }

  addActionParam(characterState: enums.ECharacterState, input: string): void {
    switch (characterState) {
      case enums.ECharacterState.SendMessageTo:
        this.actionParams.sendMessageTo = input;
        break;
      default:
        break;
    }
  }

  removeActionParam(characterState: enums.ECharacterState): void {
    switch (characterState) {
      case enums.ECharacterState.SendMessageTo:
        this.actionParams.sendMessageTo = undefined;
        break;
      default:
        break;
    }
  }

  async handleAsyncCommand(input: string, characterState: enums.ECharacterState): Promise<unknown> {
    switch (characterState) {
      case enums.ECharacterState.Registration:
        return this.controller.createProfile(input.toLowerCase() as commands.EUserRace);
      case enums.ECharacterState.GetMessages:
        return this.controller.getMessages();
      case enums.ECharacterState.SendMessageValue:
        return this.controller.sendMessage(input, this.actionParams.sendMessageTo as string);
      default:
        return this.dispatch(hooks.addLog({ message: `Unknown command '${input}'`, author: 1 }));
    }
  }

  /**
   * Because handleAsyncCommand does not allow on multiple requests in current state, I wrote this add "addon" for getMessage request
   */
  async fetchMessages(): Promise<Record<string, IGetMessages>> {
    return this.controller.getMessages();
  }

  getRegisterLogs(): void {
    const data = [
      'Hi. My name is Jessica. Welcome to our adventure guild. In order to register as an adventurer, I need you to provide me with some information. Please fill out this form.',
      '[You received registration form]',
      "First question is 'What your race ?'",
    ];

    data.forEach((message) => this.dispatch(hooks.addLog({ message, author: 1 })));
  }

  finishRegistration(): void {
    const data = [
      "It seems I got everything I need. Here's your adventurer plate.",
      '[Your receive bronze adventurer plate]',
      'Whenever you are free, you can undertake quests to earn valuable rewards and coins. Quests come and go, but you should be able to find something for yourself. Good luck and take care of yourself. We lost too many people this year',
    ];

    data.forEach((message) => this.dispatch(hooks.addLog({ message, author: 1 })));
  }
}
