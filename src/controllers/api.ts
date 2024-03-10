import nlp from 'compromise';
import { EShowOptions, EUserActions, EUserRace } from '../enums';
import { attack, initProfile, sendMessage } from '../gameApi/gameApi';
import { races, repo } from '../constants/clientCommands';
import { show as showFn } from "../constants/clientCommands";
import { IUserProfile } from '../types';
import { logout } from './logout';

const handleAttackEnemy = async (target: string, add: (output: string) => void): Promise<void> => {
  const { data } = await attack(target);

  data.data.forEach((r) => {
    add(`${r.character} attacked enemy ${r.target} for ${r.value}`);
  });
};

const validCommands = [
  { action: EUserActions.Attack, target: ['enemy', 'foe', 'opponent'] },
  { action: EUserActions.SendMessage.toLocaleLowerCase(), target: ['to'] },
  { action: EUserActions.ChooseRace.toLocaleLowerCase(), target: Object.values(EUserRace) },
  { action: EUserActions.Help.toLocaleLowerCase(), target: ['op'] },
  { action: EUserActions.Repo.toLocaleLowerCase(), target: ['op'] },
  { action: EUserActions.Show.toLocaleLowerCase(), target: Object.values(EShowOptions) },
  { action: EUserActions.Clear.toLocaleLowerCase(), target: ['op'] },
  { action: EUserActions.Exit.toLocaleLowerCase(), target: ['op'] }

];

const newUserCommand = async (command: string, add: (output: string) => void, profile: IUserProfile, clearTerminal: () => void): Promise<void> => {
  add(command);
  let userAction: EUserActions | undefined;
  let userTarget: string = '';
  let userMessage: string = '';
  let messageTarget: string = '';
  let help: string = '';
  let show: EShowOptions | undefined

  try {
    // To co wprowadził user, splitowane
    let tokens = nlp(command.toLowerCase())
      .terms()
      .map((term) => term.text()) as string[];

    validCommands.forEach((c) => {
      const { action, target } = c;

      // Dozwolone akcje z powyższej listy
      const actions = nlp(action)
        .terms()
        .map((term) => term.text()) as unknown[];

      // Sprawdź czy 1 wyraz podany przez user azgadza się z dostępnymi komendami
      if (actions.includes(tokens[0] as never)) {
        userAction = action as EUserActions;

        // Czy nie jest to komenda składająca się z 1 wyrazu?
        if (target.length > 0 && tokens.length > 1) {
          // Mały 'hack' by obsługiwało poprawnie wysyłkę wiadomości
          if (userAction === EUserActions.SendMessage || userAction === EUserActions.ChooseRacer) {
            tokens = [userAction, ...tokens.slice(2)];
          }

          // Sprawdź czy drugi wyraz w komendzie jest poprawnym "targetem" z ww. listy
          if (target.includes(tokens[1])) {
            [, userTarget] = tokens;

            // Trzeci parametr. Używany przykładowo przy "send message to jacek banana"
            if (tokens.length > 2) {
              // eslint-disable-next-line prefer-destructuring
              messageTarget = tokens[2];
              userMessage = tokens.slice(3).join(' ');
            }
          }
        } else if (tokens.length > 1) {
          userMessage = tokens.slice(1).join(' ');
        }
      }
    });

    console.log('{ userAction, userTarget, userMessage, messageTarget }');
    console.log({ userAction, userTarget, userMessage, messageTarget });

    if (userAction === EUserActions.SendMessage) {
      await sendMessage(messageTarget, userMessage);
      return add('Message send');
    }

    if (userAction === EUserActions.Attack) {
      return await handleAttackEnemy(messageTarget, add);
    }

    if (userAction === EUserActions.ChooseRace) {
      if (userTarget.length === 0) return add('Incorrect race');

      await initProfile(userTarget as EUserRace);
      return add('User choose a race');
    }

    if (userAction === EUserActions.Help) {
      return console.log('HELP');
    }

    if (userAction === EUserActions.Repo) {
      const response = await repo();

      add(response);
      return response;
    }

    if (userAction === EUserActions.Show) {
      console.log('a')
      const validRaces = await showFn(userTarget, profile);
      add(validRaces);
      return validRaces;
    }

    if (userAction === EUserActions.Clear) {
      return clearTerminal();
      // #TODO Fix terminal clear

    }

    if (userAction === EUserActions.Exit) {
      return logout();
    }

  } catch (err) {
    add(`We got an error ${(err as Error).message}`);
  }
};

export default newUserCommand;