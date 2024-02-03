import type { IDetailedMessage, IGetMessages } from '../../types/messages';
import * as hooks from '../../redux';
import type * as enums from '../../enums';
import { EMessageComponentActions } from '../../enums';
import Controller from './controller';
import type { MainDispatch } from '../../redux/types';

export default class Handler {
  private readonly _controller: Controller;

  private readonly _dispatch: MainDispatch;

  private readonly _messagesComponentAction:
    | ((
        params:
          | {
              action: enums.EMessageComponentActions;
              params: string | number;
            }
          | undefined,
      ) => void)
    | undefined = undefined;

  private readonly _setCanWrite: (data: boolean) => void;

  constructor(
    dispatch: MainDispatch,
    setCanWrite: (data: boolean) => void,
    action: (
      params:
        | {
            action: enums.EMessageComponentActions;
            params: string | number;
          }
        | undefined,
    ) => void,
  ) {
    this._controller = new Controller();
    this._dispatch = dispatch;
    this._messagesComponentAction = action;
    this._setCanWrite = setCanWrite;
  }

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

  private get controller(): Controller {
    return this._controller;
  }

  private get dispatch(): MainDispatch {
    return this._dispatch;
  }

  private get setCanWrite(): (data: boolean) => void {
    return this._setCanWrite;
  }

  runAction(action: EMessageComponentActions, input: unknown): void {
    this.messagesComponentAction(undefined);

    // Validation
    switch (action) {
      case EMessageComponentActions.GetMessage:
        if (input === undefined) {
          setTimeout(() => {
            this.dispatch(
              hooks.addLog({
                message: 'You have no messages exchanged with this person',
                author: 1,
              }),
            );
          }, 1000);
          return;
        }
        break;
      default:
        break;
    }

    // Handle render action
    switch (action) {
      case EMessageComponentActions.RenderMessageDetails:
        this.renderMessagesDetails(input as IDetailedMessage[]);
        return;
      default:
        break;
    }

    this.handleAction(action, input)
      .then(() => this.setCanWrite(true))
      .catch((err) => {
        console.log('err');
        console.log(err);
        this.setCanWrite(true);
        this.dispatch(hooks.addLog({ message: 'We have encountered an issue while fetching your data', author: 1 }));
      });
  }

  private async handleAction(action: EMessageComponentActions, input: unknown): Promise<void> {
    const callback = await this.fetchData(action, input);

    switch (action) {
      case EMessageComponentActions.GetMessage:
        this.handleMessagesDetails(callback as IDetailedMessage[], this.messagesComponentAction);
        break;
      default:
        break;
    }
  }

  private async fetchData(action: EMessageComponentActions, input: unknown): Promise<unknown> {
    switch (action) {
      case EMessageComponentActions.GetMessage:
        return this.controller.getMessage((input as IGetMessages).chatId);
      default:
        return undefined;
    }
  }

  private handleMessagesDetails(
    details: IDetailedMessage[],
    action: (
      params:
        | {
            action: EMessageComponentActions;
            params: string | number;
          }
        | undefined,
    ) => void,
  ): void {
    this.dispatch(hooks.addMessages({ details }));
    if (details.length > 0) {
      action({ action: EMessageComponentActions.RenderMessageDetails, params: details[0]!.chatId });
    } else {
      this.dispatch(hooks.addLog({ message: 'No messages exchanged with this user', author: 1 }));
    }
  }

  private renderMessagesDetails(details: IDetailedMessage[]): void {
    this.dispatch(hooks.addLog({ message: 'Loading last 10 messages', author: 1 }));

    details
      .sort((a, b) => {
        if (new Date(a.date).getTime() > new Date(b.date).getTime()) return 1;
        if (new Date(a.date).getTime() < new Date(b.date).getTime()) return -1;
        return 0;
      })
      .forEach((d) => {
        this.dispatch(
          hooks.addLog({
            message: `${d.sender}: ${d.message}`,
            author: 1,
          }),
        );
      });
  }
}
