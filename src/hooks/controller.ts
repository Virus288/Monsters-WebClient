import { EConfirmationCommands, EUserCommands, EUserRace } from "../enums";
import { initProfile } from "../gameApi/gameApi";
import { IMiddleware } from "../types";
import { useHistoryStore } from "../zustand/store";
import * as Commands from "./useCommands";




const newUserCommand = async (input: string, middleware: IMiddleware, setMiddleware: React.Dispatch<React.SetStateAction<IMiddleware>>, add): Promise<void> => {

    const availableCommands = getAvailableCommands(middleware).map((command) => command.toLocaleLowerCase());

    if (!availableCommands.includes(input.toLocaleLowerCase().trim())) {

        add('InvalidCommand')
        return
    }
    if (input === 'help') {
        add(input);
        return;
    }

    if (middleware.state === EUserCommands.UNNITALIZED) {
        add('confirmationWindow');
        setMiddleware({ ...middleware, data: input, state: EUserCommands.CONFIRMATION, oldState: EUserCommands.UNNITALIZED });
        return;
    }
    if (middleware.state === EUserCommands.CONFIRMATION) {

        if (input === EConfirmationCommands.YES as string) {

            if (middleware?.oldState === EUserCommands.UNNITALIZED) {
                const data = await initProfile(middleware.data);

                if (data.status !== '200') {
                    console.log('ERROR');
                    console.log(data);
                }
                add('confirmationSuccesWindow');
                setMiddleware({ ...middleware, data: undefined, state: EUserCommands.MAP });
            }
        }
        if (input === EConfirmationCommands.NO as string) {

            setMiddleware({ ...middleware, data: undefined, state: middleware?.oldState ?? EUserCommands.MAP });
        }
        return;
    }
    add(input);

};


const getAvailableCommands = (middleware: IMiddleware): string[] => {

    let data: string[] = [
        'help',
    ];

    switch (middleware.state) {

        case EUserCommands.UNNITALIZED:
            data = [...data, ...(Object.values(EUserRace) as string[])];
            break;

        case EUserCommands.CONFIRMATION:
            data = [...data, ...(Object.values(EConfirmationCommands) as string[])];
            break;

        default:
            data = [...data, ...(Object.keys(Commands))];

            break;
    }

    return data;
};

export default newUserCommand;