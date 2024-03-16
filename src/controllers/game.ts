import nlp from 'compromise';
import { ECharacterState, EShowOptions, EUserActions, EUserRace } from '../enums';
import { handleAttackEnemy, show as showFn } from './responses';
import type { IAvailableCommands, IUserProfile } from '../types';
import { initProfile, sendMessage } from '../communication';

const baseCommands: IAvailableCommands[] = [
  { action: EUserActions.Attack, target: ['enemy'] },
  {
    action: EUserActions.Send.toLocaleLowerCase(),
    target: ['message'],
    secondTarget: ['username'],
    thirdTarget: ['message'],
  },
  { action: EUserActions.Choose.toLocaleLowerCase(), target: ['race'], secondTarget: Object.values(EUserRace) },
  { action: EUserActions.Help.toLocaleLowerCase() },
  { action: EUserActions.Show.toLocaleLowerCase(), target: Object.values(EShowOptions) },
  { action: EUserActions.Clear.toLocaleLowerCase() },
  { action: EUserActions.Exit.toLocaleLowerCase() },
];

const getAvailableCommands = (profile: IUserProfile): IAvailableCommands[] => {
  if (!profile.initialized) {
    return baseCommands.filter(
      (c) => (c.action as EUserActions) === EUserActions.Choose || (c.action as EUserActions) === EUserActions.Help,
    );
  }

  // Add filtering commands based on state. Documentation about it will be added later
  switch (profile.state) {
    case ECharacterState.Map:
      return baseCommands.filter((c) => (c.action as EUserActions) !== EUserActions.Attack);
    case ECharacterState.Fight:
    default:
      return baseCommands;
  }
};

const chooseRace = async (race: string, add: (output: string) => void): Promise<void> => {
  await initProfile(race as EUserRace);
  return add(`Jessica [NPC]: Great. Looks like I've got everything I need.
              You are not officially registered adventurer. If you want to take any quests, you can find on your left on job board. 
              Please be careful. We lost too many people last year`);
};

const renderHelp = (add: (output: string) => void, profile: IUserProfile): void => {
  const commands = getAvailableCommands(profile);
  add('Available commands:');

  commands.forEach((c) => {
    setTimeout(() => {
      add(
        `- ${c.action} ${c.target ? `[${c.target.join(' / ')}]` : ''} ${c.secondTarget ? `[${c.secondTarget.join(' / ')}]` : ''}`,
      );
    }, 100);
  });
};

const renderAvailableRaces = (add: (output: string) => void): void => {
  add('Available races:');
  Object.values(EUserRace).forEach((c) => {
    setTimeout(() => {
      add(`- ${c}`);
    }, 100);
  });
};

const formatInput = (input: string, profile: IUserProfile): [EUserActions, ...string[]] => {
  const preparedInput: [EUserActions?, ...string[]] = [];

  const tokens = nlp(input)
    .terms()
    .map((term) => term.text()) as string[];

  getAvailableCommands(profile).forEach((c) => {
    const { action, target } = c;

    const actions = nlp(action)
      .terms()
      .map((term) => term.text()) as string[];

    if (actions.includes(tokens[0]?.toLowerCase())) {
      preparedInput.push(action.toLocaleLowerCase().toLowerCase());

      if ((target?.length ?? 0) > 0 && tokens.length > 0) {
        if ((target as string[]).includes(tokens[1]?.toLowerCase())) {
          preparedInput.push(tokens[1]);

          if (tokens.length > 2) {
            // Ignore 'to' from 'send message to target'
            if (tokens[2]?.toLowerCase() === 'to') {
              preparedInput.push(tokens[3]);
              preparedInput.push(tokens.slice(4).join(' '));
            } else {
              preparedInput.push(tokens[2]);
              preparedInput.push(tokens.slice(3).join(' '));
            }
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
  const prepared = formatInput(command, profile);
  const action = prepared[0];

  if (!action) {
    add("Incorrect command. Type 'help' to see all available commands");
    return;
  }

  switch (action) {
    case EUserActions.Help:
      renderHelp(add, profile);
      break;
    case EUserActions.Send:
      if (prepared[1].toLowerCase() === 'message') {
        if (!prepared[2]) {
          add('No receiver provided');
        } else if (!prepared[3]) {
          add('No message provided');
        } else {
          await sendMessage(prepared[2], prepared[3]);
          add('Message sent');
        }
      } else {
        add('Sending other elements than messages is not supported');
      }
      break;
    case EUserActions.Attack:
      await handleAttackEnemy(prepared[1], add);
      break;
    case EUserActions.Choose:
      if (!prepared[1] || prepared[1].toLowerCase() !== 'race') {
        add('Incorrect command');
      } else if (!Object.values(EUserRace).includes(prepared[2].toLowerCase() as EUserRace)) {
        add('incorrect race.');
        renderAvailableRaces(add);
      } else {
        await chooseRace(prepared[2], add);
      }
      break;
    case EUserActions.Show:
      showFn(prepared[1].toLowerCase() as EShowOptions, profile, add);
      break;
    case EUserActions.Clear:
      clearTerminal();
      break;
    default:
      add("Incorrect command. Type 'help' to see all available commands");
      break;
  }
};
