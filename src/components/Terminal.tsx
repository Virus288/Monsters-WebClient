import '../style/terminal.css';
import React, { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import type { TerminalProps } from '../types';
import { newUserCommand } from '../controllers';
import { useAccountStore, useFightsStore, useHistoryStore } from '../zustand/store';
import Portal from './Portal';
import { Button } from './ui/button';
import ReportBugForm from './forms/ReportBugForm';
import { initMessage, uninitializedProfile } from '../controllers/responses';
import { reportBug } from '../communication';

const Terminal = forwardRef((props: TerminalProps) => {
  const inputRef = useRef<HTMLInputElement>();

  const [input, setInputValue] = useState<string>('');
  const [terminalRef, setDomNode] = useState<HTMLDivElement>();
  const setTerminalRef = useCallback((node: HTMLDivElement) => setDomNode(node), []);

  const { promptLabel = '>', account, profile, addProfile } = props;

  const history = useHistoryStore((state) => state.history);
  const add = useHistoryStore((state) => state.addToHistory);
  const clearTerminal = useHistoryStore((state) => state.clearHistory);
  const addFight = useFightsStore((state) => state.addCurrentFight);
  const currentFight = useFightsStore((state) => state.activeFight);
  const removeCurrentFight = useFightsStore((state) => state.removeCurrentFight);
  const username = useAccountStore((state) => state.account?.login);

  const focusInput = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const msg = initMessage();
    add(msg.target, msg.message);

    if (!profile?.initialized && profile && account.login) {
      uninitializedProfile(account.login, add);
    }
  }, [account.login, add, profile]);

  useEffect(() => {
    const windowResizeEvent = (): void => {
      terminalRef?.scrollTo({
        top: terminalRef?.scrollHeight ?? 99999,
        behavior: 'smooth',
      });
    };
    window.addEventListener('resize', windowResizeEvent);

    return (): void => {
      window.removeEventListener('resize', windowResizeEvent);
    };
  }, [terminalRef]);

  useEffect(() => {
    focusInput();
  });

  /**
   * When user types something, update input value
   */
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }, []);

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      setInputValue('');
      add(username as string, input);

      newUserCommand(
        input,
        username as string,
        add,
        clearTerminal,
        profile,
        addProfile,
        currentFight,
        addFight,
        removeCurrentFight,
      ).catch((err) => {
        console.log('err');
        console.log(err);
        add('System', `${(err as Error).message}`);
      });
      terminalRef?.scrollTo({
        top: terminalRef?.scrollHeight ?? 99999,
        behavior: 'smooth',
      });
    }
  };

  const [bugReport, setBugReport] = useState<string>('');

  return (
    <div className="terminal  " ref={setTerminalRef} onClick={focusInput}>
      {history.map((c, index) => {
        // const action = Commands[target as keyof typeof Commands];

        return (
          <div className="terminal__line" key={`terminal-line-${index}-${c.message}`}>
            {c.target !== undefined && c.target !== '' ? `${c.target}: ${c.message}` : c.message}
          </div>
        );
      })}
      <div className="terminal__prompt">
        <div className="terminal__prompt__label">{promptLabel}</div>
        <div className="terminal__prompt__input">
          <input
            type="text"
            value={input}
            onKeyDown={(e) => handleInputKeyDown(e)}
            onChange={handleInputChange}
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            ref={inputRef}
          />
        </div>
      </div>

      <div className="fixed top-2 right-[170px]">
        <Portal
          button={<Button className="bg-rose-900 hover:bg-rose-800 font-semibold">Report Bug</Button>}
          triggerFn={() => {
            reportBug(bugReport)
              .then(() => add('System', 'Bug reported'))
              .catch(() => add('System', "Couldn't send bug report"));
          }}
        >
          <ReportBugForm setBugReport={setBugReport} />
        </Portal>
      </div>
    </div>
  );
});

export default Terminal;
