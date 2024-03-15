import nlp from 'compromise';
import { EShowOptions, EUserActions, EUserRace } from '../enums';
import { handleAttackEnemy, show as showFn } from './responses';
import type { IUserProfile } from '../types';
import { initProfile, sendMessage } from '../communication';

const validCommands = [
  { action: EUserActions.Attack, target: ['enemy'] },
  { action: EUserActions.SendMessage.toLocaleLowerCase(), target: ['to'] },
  { action: EUserActions.ChooseRace.toLocaleLowerCase(), target: Object.values(EUserRace) },
  { action: EUserActions.Help.toLocaleLowerCase(), target: ['op'] },
  { action: EUserActions.Show.toLocaleLowerCase(), target: Object.values(EShowOptions) },
  { action: EUserActions.Clear.toLocaleLowerCase(), target: ['op'] },
  { action: EUserActions.Exit.toLocaleLowerCase(), target: ['op'] },
];

const chooseRace = async (race: string, add: (output: string) => void): Promise<void> => {
  if (!Object.values(EUserRace).includes(race.toLowerCase() as EUserRace)) {
    return add('Incorrect race');
  }
  await initProfile(race as EUserRace);
  return add(`Jessica [NPC]: Great. Looks like I've got everything I need.
              You are not officially registered adventurer. If you want to take any quests, you can find on your left on job board. 
              Please be careful. We lost too many people last year`);
};

const renderHelp = (add: (output: string) => void): void => {
  Object.values(EUserActions).forEach((c) => {
    setTimeout(() => {
      add(c);
    }, 100);
  });
};

const isMultiWordTarget = (action: EUserActions): boolean => {
  const multiWordTarget: string[] = [EUserActions.SendMessage, EUserActions.ChooseRace];
  return multiWordTarget.includes(action);
};

const formatInput = (input: string): [EUserActions, ...string[]] => {
  const preparedInput: [EUserActions?, ...string[]] = [];

  let tokens = nlp(input.toLowerCase())
    .terms()
    .map((term) => term.text()) as string[];

  validCommands.forEach((c) => {
    const { action, target } = c;

    const actions = nlp(action)
      .terms()
      .map((term) => term.text()) as unknown[];

    if (actions.includes(tokens[0] as never)) {
      preparedInput.push(action.toLocaleLowerCase());

      if (target.length > 0 && tokens.length > 1) {
        if (isMultiWordTarget(preparedInput[0] as EUserActions)) {
          tokens = [preparedInput[0] as EUserActions, ...tokens.slice(2)];
        }

        if (target.includes(tokens[1])) {
          preparedInput.push(tokens[1]);

          if (tokens.length > 2) {
            preparedInput.push(tokens[2]);
            preparedInput.push(tokens.slice(3).join(' '));
          }
        }
      } else if (tokens.length > 1) {
        preparedInput.push(tokens.slice(1).join(' '));
      }
    }
  });

  return preparedInput as [EUserActions, ...string[]];
};

// eslint-disable-next-line import/prefer-default-export
export const newUserCommand = async (
  command: string,
  add: (output: string) => void,
  profile: IUserProfile,
  clearTerminal: () => void,
): Promise<void> => {
  const prepared = formatInput(command);
  const action = prepared[0];

  if (!action) {
    add("Incorrect command. Type 'help' to see all available commands");
    return;
  }

  try {
    switch (action) {
      case EUserActions.Help:
        renderHelp(add);
        break;
      case EUserActions.SendMessage:
        await sendMessage(prepared[1], prepared[2]);
        add('Message sent');
        break;
      case EUserActions.Attack:
        await handleAttackEnemy(prepared[1], add);
        break;
      case EUserActions.ChooseRace:
        await chooseRace(prepared[1], add);
        break;
      case EUserActions.Show:
        showFn(prepared[1] as EShowOptions, profile, add);
        break;
      case EUserActions.Clear:
        clearTerminal();
        break;
      default:
        add("Incorrect command. Type 'help' to see all available commands");
        break;
    }
  } catch (err) {
    console.log('err');
    console.log(err);
    add(`We got an error ${(err as Error).message}`);
  }
};
