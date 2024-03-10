import { EShowOptions } from "../enums";
import { IUserProfile } from "../types";



export const uninitializedProfile = async ({ userLogin }: string): Promise<string> => {



    return `Jessica [NPC]: Welcome ${userLogin} My name is Jessica.
               Welcome to our adventure guild. In order to register as an adventurer,
               I need you to provide me with some information.
               [You pick up registration form]
               First question is: What your race ?
        `

    // #TODO INSTALL CHALK
}



export const repo = async (): Promise<string> => {

    window.open(`https://github.com/Monsters-RPG-game`);
    return 'Opening Github repository...';
};

export const logout = (): string => {
    return `
Loging out... 
  `;
}

export const displayProfile = async ({ lvl, exp, race }: IUserProfile): Promise<string> => {


    return `
RACE:${race}
LVL:${lvl}
EXP:${`${exp[0]}/${exp[1]}`}

`
};

export const initMessage = (): string => {
    return `
Starting server... ✔️
  `;
}

export const show = async (arg: EShowOptions, profile: IUserProfile): Promise<string> => {

    // TODO :profile,messages, show raport from fight

    switch (arg) {

        case EShowOptions.Races:
            return `
Available races:
Human - Versatile and ambitious, humans make up the majority of the population in the game world. They can exhibit a wide range of talents.

Elf - Long-lived and attuned to nature, elves are agile and intelligent beings. They possess magical abilities.

Goblin - Clever and greedy, goblins are often known for their tendencies towards theft and intrigue. They can be adept merchants as well as rogues.

Dwarf - Resilient and skillful, dwarves are known for their strength and craftsmanship. They are masters of metalworking.

Orc - Strong and fierce, orcs are known for their aggressiveness and innate physical strength. They are often warriors or barbarians.

Fairy - (Assuming characteristics based on typical folklore) Ethereal and magical, fairies are beings of nature, often associated with beauty and mischief. They possess abilities related to enchantment and nature manipulation.

DragonBorn - (Assuming characteristics based on typical fantasy lore) Noble and powerful, DragonBorn are beings with draconic ancestry, often possessing scales, wings, and breath weapons. They are formidable warriors and leaders, with a connection to the ancient power of dragons.
  `;


        case EShowOptions.Profile:

            return displayProfile(profile)


        default:
            return `
        Missing param. Please provide a parameter for the show command.
        
        Available options:
        - Races: Display available races.
        - Players: Display players online.
        - Profile: Display user's profile.
        `;

    }
};
