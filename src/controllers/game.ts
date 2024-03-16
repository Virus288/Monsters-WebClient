import nlp from 'compromise';
import { ECharacterState, EShowOptions, EUserActions, EUserRace } from '../enums';
import { handleAttackEnemy, show as showFn } from './responses';
import type { IAvailableCommands, IFightEntity, IFightTeam, IUserProfile } from '../types';
import { createFight, getActiveFight, initProfile, leaveFight, saveLog, sendMessage } from '../communication';

const baseCommands: IAvailableCommands[] = [
  { action: EUserActions.Attack, target: ['enemy'] },
  {
    action: EUserActions.Send.toLocaleLowerCase(),
    target: ['message'],
    secondTarget: ['to usernname'],
    thirdTarget: ['message body'],
  },
  { action: EUserActions.Choose.toLocaleLowerCase(), target: ['race'], secondTarget: Object.values(EUserRace) },
  { action: EUserActions.Help.toLocaleLowerCase() },
  { action: EUserActions.Show.toLocaleLowerCase(), target: Object.values(EShowOptions) },
  { action: EUserActions.Leave.toLocaleLowerCase(), target: ['fight'] },
  {
    action: EUserActions.Create.toLocaleLowerCase(),
    target: ['fight'],
    secondTarget: ['against'],
    thirdTarget: ['username'],
  },
  { action: EUserActions.Clear.toLocaleLowerCase() },
  { action: EUserActions.Exit.toLocaleLowerCase() },
];

const prepareAdd = async (add: (command: string) => void, input: string): Promise<void> => {
  add(input);
  await saveLog(input);
};

const getAvailableCommands = (
  profile: IUserProfile,
  userName: string,
  fight: IFightEntity | undefined,
): IAvailableCommands[] => {
  if (!profile.initialized) {
    return baseCommands.filter(
      (c) => (c.action as EUserActions) === EUserActions.Choose || (c.action as EUserActions) === EUserActions.Help,
    );
  }

  // Add filtering commands based on state. Documentation about it will be added later
  switch (profile.state) {
    case ECharacterState.Map:
      return baseCommands.filter(
        (c) => (c.action as EUserActions) !== EUserActions.Attack && (c.action as EUserActions) !== EUserActions.Choose,
      );
    case ECharacterState.Fight:
    default:
      return fight
        ? baseCommands
            .filter((c) => (c.action as EUserActions) !== EUserActions.Choose)
            .map((a) => {
              if ((a.action as EUserActions) !== EUserActions.Attack) return a;
              let enemyTeam: IFightTeam[] | undefined;

              fight.states.current.teams.forEach((t) => {
                if (!t.find((team) => team.character === userName)) {
                  enemyTeam = t;
                }
              });

              return { ...a, target: enemyTeam ? enemyTeam.map((e) => e.character) : [] };
            })
        : baseCommands.filter((c) => (c.action as EUserActions) !== EUserActions.Choose);
  }
};

const chooseRace = async (race: string, add: (output: string) => Promise<void>): Promise<void> => {
  await initProfile(race as EUserRace);
  return add(`Jessica [NPC]: Great. Looks like I've got everything I need.
              You are not officially registered adventurer. If you want to take any quests, you can find on your left on job board. 
              Please be careful. We lost too many people last year`);
};

const renderHelp = (
  add: (output: string) => void,
  profile: IUserProfile,
  username: string,
  fight: IFightEntity | undefined,
): void => {
  const commands = getAvailableCommands(profile, username, fight);
  add('Available commands:');

  commands.forEach((c) => {
    setTimeout(() => {
      add(
        `- ${c.action} ${c.target ? `[${c.target.join(' / ')}]` : ''} ${c.secondTarget ? `[${c.secondTarget.join(' / ')}]` : ''} ${c.thirdTarget ? `[${c.thirdTarget.join(' / ')}]` : ''}`,
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

const formatInput = (
  input: string,
  profile: IUserProfile,
  username: string,
  fight: IFightEntity | undefined,
): [EUserActions, ...string[]] => {
  const preparedInput: [EUserActions?, ...string[]] = [];

  const tokens = nlp(input)
    .terms()
    .map((term) => term.text()) as string[];

  getAvailableCommands(profile, username, fight).forEach((c) => {
    const { action, target } = c;

    const actions = nlp(action)
      .terms()
      .map((term) => term.text()) as string[];

    if (actions.includes(tokens[0]?.toLowerCase())) {
      preparedInput.push(action.toLocaleLowerCase().toLowerCase());

      if ((target?.length ?? 0) > 0 && tokens.length > 0) {
        if ((target as string[]).map((t) => t.toLowerCase()).includes(tokens[1]?.toLowerCase())) {
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
  username: string,
  add: (output: string) => void,
  clearTerminal: () => void,
  profile: IUserProfile,
  addProfile: (profile: IUserProfile) => void,
  currentFight: IFightEntity | undefined,
  addFight: (data: IFightEntity) => void,
  removeCurrentFight: () => void,
): Promise<void> => {
  const prepared = formatInput(command, profile, username, currentFight);
  const action = prepared[0];

  if (!action) {
    add("Incorrect or not allowed command. Type 'help' to see all available commands");
    return;
  }
  await saveLog(command);

  switch (action) {
    case EUserActions.Help:
      renderHelp(add, profile, username, currentFight);
      break;
    case EUserActions.Leave:
      if (prepared[1].toLowerCase() === 'fight') {
        const data = await leaveFight();
        addProfile({ ...profile, ...data.data.state });
        removeCurrentFight();
        await prepareAdd(add, 'Fight left');
      } else {
        await prepareAdd(add, "Incorrect 'leave' target");
      }
      break;
    case EUserActions.Send:
      if (prepared[1].toLowerCase() === 'message') {
        if (!prepared[2]) {
          await prepareAdd(add, 'No receiver provided');
        } else if (!prepared[3]) {
          await prepareAdd(add, 'No message provided');
        } else {
          await sendMessage(prepared[2], prepared[3]);
          await prepareAdd(add, 'Message sent');
        }
      } else {
        await prepareAdd(add, 'Sending other elements than messages is not supported');
      }
      break;
    case EUserActions.Create:
      if (prepared[1].toLowerCase() === 'fight') {
        if (prepared[2] !== 'against') {
          await prepareAdd(add, "Incorrect command. Type 'help' to see all available commands");
          return;
        }
        const data = await createFight(prepared[3]);
        addProfile({ ...profile, ...data.data.state });
        const activeFight = await getActiveFight();
        addFight(activeFight.data.data[0]);
        await prepareAdd(add, 'Fight created');
      } else {
        await prepareAdd(add, 'Sending other elements than messages is not supported');
      }
      break;
    case EUserActions.Attack:
      if (!prepared[1]) {
        await prepareAdd(add, 'No enemy chosen');
        return;
      }
      await handleAttackEnemy(
        prepared[1],
        async (command: string) => prepareAdd(add, command),
        profile,
        addProfile,
        removeCurrentFight,
      );
      break;
    case EUserActions.Choose:
      if (!prepared[1] || prepared[1].toLowerCase() !== 'race') {
        await prepareAdd(add, 'Incorrect command');
      } else if (!Object.values(EUserRace).includes(prepared[2].toLowerCase() as EUserRace)) {
        await prepareAdd(add, 'Incorrect race');
        renderAvailableRaces(add);
      } else {
        await chooseRace(prepared[2], async (command: string) => prepareAdd(add, command));
      }
      break;
    case EUserActions.Show:
      showFn(prepared[1].toLowerCase() as EShowOptions, profile, add);
      break;
    case EUserActions.Clear:
      clearTerminal();
      break;
    default:
      await prepareAdd(add, "Incorrect command. Type 'help' to see all available commands");
      break;
  }
};
