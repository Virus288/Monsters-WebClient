import type { IUserProfile } from '../types';
import { EFightAction, EFightStatus, EShowOptions } from '../enums';
import { attack } from '../communication';

export const uninitializedProfile = (userLogin: string, add: (target: string, output: string) => void): void => {
  add(
    'Jessica [NPC]',
    `Welcome ${userLogin} My name is Jessica.
               Welcome to our adventure guild. In order to register as an adventurer,
               I need you to provide me with some information.
               [You pick up registration form]
               First question is: What your race ?`,
  );
};

export const displayProfile = (
  { lvl, exp, race }: IUserProfile,
  add: (target: string, message: string) => void,
): void => {
  add(
    '',
    `RACE:${race}
      LVL:${lvl}
      EXP:${`${exp[0]}/${exp[1]}`}`,
  );
};

export const initMessage = (): { target: string; message: string } => {
  return { target: '', message: 'Starting game... ✔' };
};

export const show = (arg: EShowOptions, profile: IUserProfile, add: (target: string, output: string) => void): void => {
  switch (arg) {
    case EShowOptions.Races:
      add(
        '',
        `Available races:
Human - Versatile and ambitious, humans make up the majority of the population in the game world. They can exhibit a wide range of talents.

Elf - Long-lived and attuned to nature, elves are agile and intelligent beings. They possess magical abilities.

Goblin - Clever and greedy, goblins are often known for their tendencies towards theft and intrigue. They can be adept merchants as well as rogues.

Dwarf - Resilient and skillful, dwarves are known for their strength and craftsmanship. They are masters of metalworking.

Orc - Strong and fierce, orcs are known for their aggressiveness and innate physical strength. They are often warriors or barbarians.

Fairy - (Assuming characteristics based on typical folklore) Ethereal and magical, fairies are beings of nature, often associated with beauty and mischief. They possess abilities related to enchantment and nature manipulation.

DragonBorn - (Assuming characteristics based on typical fantasy lore) Noble and powerful, DragonBorn are beings with draconian ancestry, often possessing scales, wings, and breath weapons. They are formidable warriors and leaders, with a connection to the ancient power of dragons.`,
      );
      break;
    case EShowOptions.Profile:
      displayProfile(profile, add);
      break;
    default:
      add(
        '',
        `Missing param. Please provide a parameter for the show command.
        Available options:
        - Races: Display available races.
        - Players: Display players online.
        - Profile: Display user's profile.`,
      );
      break;
  }
};

/**
 * Make actions more natural sounding
 *
 * @returns {string} Stringed value
 */
const prepareFightActionResponse = (action: EFightAction): string => {
  switch (action) {
    case EFightAction.Attack:
      return 'attacked';
    default:
      return 'Unknown move';
  }
};

export const handleAttackEnemy = async (
  target: string,
  add: (target: string, output: string) => Promise<void>,
  profile: IUserProfile,
  addProfile: (profile: IUserProfile) => void,
  removeCurrentFight: () => void,
): Promise<void> => {
  const { data } = await attack(target);

  if (data.state) {
    addProfile({ ...profile, ...data.state });
    removeCurrentFight();
  }

  switch (data.data.status) {
    case EFightStatus.Win:
      await add('System', 'Fight won');
      break;
    case EFightStatus.Lose:
      await add('System', 'Fight lost');
      break;
    case EFightStatus.Ongoing:
    default:
      break;
  }

  // eslint-disable-next-line compat/compat
  await Promise.all(
    data.data.logs.map(async (l) => {
      await add('System', `${l.character} ${prepareFightActionResponse(l.action)} ${l.target} for ${l.value}`);
    }),
  );
};
