import nlp from 'compromise';
import { EUserActions, EUserRace } from '../enums';
import { attack, initProfile, sendMessage } from '../gameApi/gameApi';

const handleAttackEnemy = async (target: string, add: (output: string) => void): Promise<void> => {
  const { data } = await attack(target);

  data.data.forEach((r) => {
    add(`${r.character} attacked enemy ${r.target} for ${r.value}`);
  });
};

const validCommands = [
  { action: EUserActions.Attack, target: ['enemy', 'foe', 'opponent'] },
  { action: EUserActions.SendMessage.toLocaleLowerCase(), target: ['to'] },
  { action: EUserActions.ChooseRacer.toLocaleLowerCase(), target: Object.values(EUserRace) },
];

const newUserCommand = async (command: string, add: (output: string) => void): Promise<void> => {
  let userAction: EUserActions | undefined;
  let userTarget: string = '';
  let userMessage: string = '';
  let messageTarget: string = '';

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

    if (userAction === EUserActions.ChooseRacer) {
      if (userTarget.length === 0) return add('Incorrect race');

      await initProfile(userTarget as EUserRace);
      return add('User choose a race');
    }
  } catch (err) {
    add(`We got an error ${(err as Error).message}`);
  }
};

export default newUserCommand;
