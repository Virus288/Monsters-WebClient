import type React from 'react';
import type { MainDispatch } from '../redux/types';
import * as hooks from '../redux';
import * as enums from '../enums';
import { EMessageComponentActions } from '../enums';
import Handler from './handler';
import * as commands from '../enums/commands';
import type { IFullError, IUserProfile } from '../types';
import type { IGetMessages } from '../types/messages';

/**
 * Logs controller, used by components, which runs all 'game' actions
 */
export default class LogsController {
  private readonly _handler: Handler;

  private readonly _dispatch: MainDispatch;

  private readonly _user: {
    profile: IUserProfile;
    userName: string;
  };

  /**
   * Void, which can block user's input. When used, 'Logs' component manages other end of this action
   */
  private readonly _setCanWrite: (canWrite: boolean) => void;

  constructor(
    dispatch: MainDispatch,
    setCanWrite: (data: boolean) => void,
    user: {
      profile: IUserProfile;
      userName: string;
    },
  ) {
    this._dispatch = dispatch;
    this._setCanWrite = setCanWrite;
    this._user = user;
    this._handler = new Handler(dispatch, (state: enums.ECharacterState) => {
      this.characterState = state;
    });
  }

  /**
   * Void, which communications with 'messages' component to use redux data in order to run actions
   */
  private _messagesComponentAction:
    | ((
        params:
          | {
              action: enums.EMessageComponentActions;
              params: string | number;
            }
          | undefined,
      ) => void)
    | undefined = undefined;

  private get messagesComponentAction(): (
    params:
      | {
          action: enums.EMessageComponentActions;
          params: string | number;
        }
      | undefined,
  ) => void {
    return this._messagesComponentAction as (
      params:
        | {
            action: enums.EMessageComponentActions;
            params: string | number;
          }
        | undefined,
    ) => void;
  }

  private set messagesComponentAction(
    value: (
      params:
        | {
            action: enums.EMessageComponentActions;
            params: string | number;
          }
        | undefined,
    ) => void,
  ) {
    this._messagesComponentAction = value;
  }

  private _characterState: enums.ECharacterState | null = null;

  private get characterState(): enums.ECharacterState {
    return this._characterState as enums.ECharacterState;
  }

  private set characterState(value: enums.ECharacterState) {
    this._characterState = value;
  }

  private get handler(): Handler {
    return this._handler;
  }

  private get setCanWrite(): (canWrite: boolean) => void {
    return this._setCanWrite;
  }

  private get user(): {
    profile: IUserProfile;
    userName: string;
  } {
    return this._user;
  }

  private get dispatch(): MainDispatch {
    return this._dispatch;
  }

  /**
   * Throw this error if root element got removed
   */
  changeCharacterState(state: enums.ECharacterState): void {
    this.characterState = state;
  }

  /**
   * Return all commands, that user can run in current character state.
   * Empty array as callback means 'anything' and will not be validated
   */
  getAvailableCommands(): string[] {
    switch (this.characterState) {
      case enums.ECharacterState.Registration:
        return Object.values(commands.EUserRace);
      case enums.ECharacterState.GetMessage:
      case enums.ECharacterState.SendMessageTo:
      case enums.ECharacterState.SendMessageValue:
        return [];
      default:
        return Object.values(commands.EGenericActions);
    }
  }

  /**
   * Return keys of available user commands
   */
  getAvailableCommandsKeys(): string[] {
    switch (this.characterState) {
      case enums.ECharacterState.Registration:
        return Object.keys(commands.EUserRace);
      case enums.ECharacterState.GetMessage:
      case enums.ECharacterState.SendMessageTo:
      case enums.ECharacterState.SendMessageValue:
        return [];
      default:
        return Object.keys(commands.EGenericActions);
    }
  }

  /**
   * Get user input on "enter" key
   */
  sendLogOnEnter(
    e: React.KeyboardEvent<HTMLInputElement>,
    canWrite: boolean,
    setMessage: React.Dispatch<React.SetStateAction<string>>,
  ): void {
    if (e.key !== 'Enter') return;
    this.sendLog((e.target as HTMLInputElement).value, canWrite, setMessage);
  }

  /**
   * Get user input and validate it
   */
  sendLog(input: string, canWrite: boolean, setMessage: React.Dispatch<React.SetStateAction<string>>): void {
    if (!canWrite || input.length === 0) return;

    this.dispatch(hooks.addLog({ message: input, author: 0 }));
    this.setCanWrite(false);

    const availableCommands = this.getAvailableCommands().map((c) => c.toLowerCase());
    if (availableCommands.length > 0 && !availableCommands.includes(input.toLowerCase())) {
      this.dispatch(
        hooks.addLog({
          message: "Invalid input. You can use 'help' to gain more information about available commands",
          author: 1,
        }),
      );
      return;
    }

    this.handleLog(input)
      .then(() => {
        setMessage('');
        return this.setCanWrite(true);
      })
      .catch((err) => {
        console.log('err');
        console.log(err);
        setMessage('');
        this.setCanWrite(true);
        this.dispatch(hooks.addLog({ message: (err as IFullError).message, author: 1 }));

        // #TODO This WILL break things. Add handler for errors
        this.handler.restorePreviousCharacterState();
      });
  }

  /**
   * Load data on initialization
   */
  initLoadData(): void {
    const actions = [enums.ECharacterState.GetMessages];

    Promise.all(
      actions.map(async (a) => {
        await this.handleDataLoad(a);
      }),
    )
      .then(() => this.setCanWrite(true))
      .catch((err) => {
        console.log('err');
        console.log(err);
        this.setCanWrite(true);
        this.dispatch(hooks.addLog({ message: 'We have encountered an issue while fetching your data', author: 1 }));
      });
  }

  /**
   * Init class
   */
  async init(logs: { log: string; author: string | number }[]): Promise<void> {
    console.log(`All logs: ${logs.length}`);
    return new Promise((resolve) => {
      if (!this.user.profile.initialized) {
        this.handler.getRegisterLogs();
        this.changeCharacterState(enums.ECharacterState.Registration);
      } else {
        // Placeholder for now. Backend is not yet ready
        // await this.fetchLogs();
        // Backend should respond with character's status and current action. Since this is not yet available, adding generic state
        this.changeCharacterState(enums.ECharacterState.Map);
      }

      resolve();
    });
  }

  /**
   * Initialize function, to handle messages actions
   */
  setMessagesComponentAction(
    action: (params: { action: enums.EMessageComponentActions; params: string | number } | undefined) => void,
  ): void {
    this.messagesComponentAction = action;
  }

  /**
   * Handle user input
   */
  private async handleLog(input: string): Promise<void> {
    // Handle generic actions
    if (Object.values(commands.EGenericActions).includes(input.toLowerCase() as commands.EGenericActions)) {
      switch (input.toLowerCase() as commands.EGenericActions) {
        case commands.EGenericActions.Help:
          this.dispatch(hooks.openHelpPanel());
          break;
        case commands.EGenericActions.GetMessage:
          this.handler.savePreviousCharacterState(this.characterState);
          this.changeCharacterState(enums.ECharacterState.GetMessage);
          this.dispatch(hooks.addLog({ message: 'Message from who would you like to read ?', author: 1 }));
          break;
        case commands.EGenericActions.SendMessage:
          this.handler.savePreviousCharacterState(this.characterState);
          this.changeCharacterState(enums.ECharacterState.SendMessageTo);
          this.dispatch(hooks.addLog({ message: 'Who would you like to send a message to ?', author: 1 }));
          break;
        case commands.EGenericActions.GetMessages:
          this.messagesComponentAction({ action: enums.EMessageComponentActions.RenderAllConversations, params: 1 });
          break;
        default:
          this.dispatch(hooks.addLog({ message: 'This action is not yet finished. Come back later', author: 1 }));
          break;
      }

      return;
    }

    // Handle sync actions
    switch (this.characterState) {
      case enums.ECharacterState.SendMessageTo:
        this.handler.addActionParam(this.characterState, input);
        this.changeCharacterState(enums.ECharacterState.SendMessageValue);
        this.dispatch(hooks.addLog({ message: 'What message would you like to send ?', author: 1 }));
        return;
      case enums.ECharacterState.GetMessage:
        this.messagesComponentAction({ action: EMessageComponentActions.GetMessage, params: input });
        this.handler.restorePreviousCharacterState();
        return;
      default:
        // Handle async actions
        await this.handleAction(input);
    }
  }

  /**
   * Run user specified action
   */
  private async handleAction(input: string): Promise<void> {
    const callback = await this.handler.handleCommand(input, this.characterState);
    console.log('callback');
    console.log(callback);

    switch (this.characterState) {
      case enums.ECharacterState.Registration:
        this.handler.finishRegistration();
        return this.changeCharacterState(enums.ECharacterState.Map);
      case enums.ECharacterState.SendMessageValue:
        this.handler.removeActionParam(this.characterState);
        this.dispatch(hooks.addLog({ message: 'Message sent', author: 1 }));
        return this.handler.restorePreviousCharacterState();
      default:
        return undefined;
    }
  }

  /**
   * Run action to load data
   */
  private async handleDataLoad(characterState: enums.ECharacterState): Promise<void> {
    const callback = await this.handler.handleCommand('', characterState);

    switch (characterState) {
      case enums.ECharacterState.GetMessages:
        this.dispatch(hooks.addChats({ chats: callback as Record<string, IGetMessages> }));
        break;
      default:
        break;
    }
  }
}
