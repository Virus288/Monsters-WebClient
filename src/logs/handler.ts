import type { MainDispatch } from '../redux/types';
import * as hooks from '../redux';
import Controller from './controller';
import type * as commands from '../enums/commands';
import * as enums from '../enums';
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

  /**
   * Store for  user params on multistep commands
   */
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

  /**
   * Save user's previous state, for action, which does not influence character's actions, like sending messages
   */
  savePreviousCharacterState(characterState: enums.ECharacterState): void {
    this.previousCharacterState = characterState;
  }

  /**
   * Restore previously saved user state
   */
  restorePreviousCharacterState(): void {
    this.changeCharacterState(this.previousCharacterState as enums.ECharacterState);
  }

  /**
   * Save user's params from multistep commands
   */
  addActionParam(characterState: enums.ECharacterState, input: string): void {
    switch (characterState) {
      case enums.ECharacterState.SendMessageTo:
        this.actionParams.sendMessageTo = input;
        break;
      default:
        break;
    }
  }

  /**
   * Remove user's params from multistep commands
   */
  removeActionParam(characterState: enums.ECharacterState): void {
    switch (characterState) {
      case enums.ECharacterState.SendMessageTo:
        this.actionParams.sendMessageTo = undefined;
        break;
      default:
        break;
    }
  }

  /**
   * Handle command triggered by user
   */
  async handleCommand(input: string, characterState: enums.ECharacterState): Promise<unknown> {
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
   * Render 'register profile' logs
   */
  getRegisterLogs(): void {
    const data = [
      'Hi. My name is Jessica. Welcome to our adventure guild. In order to register as an adventurer, I need you to provide me with some information. Please fill out this form.',
      '[You received registration form]',
      "First question is 'What your race ?'",
    ];

    data.forEach((message) => this.dispatch(hooks.addLog({ message, author: 1 })));
  }

  /**
   * Render 'finished registration' logs
   */
  finishRegistration(): void {
    const data = [
      "It seems I got everything I need. Here's your adventurer plate.",
      '[Your receive bronze adventurer plate]',
      'Whenever you are free, you can undertake quests to earn valuable rewards and coins. Quests come and go, but you should be able to find something for yourself. Good luck and take care of yourself. We lost too many people this year',
    ];

    data.forEach((message) => this.dispatch(hooks.addLog({ message, author: 1 })));
  }
}
