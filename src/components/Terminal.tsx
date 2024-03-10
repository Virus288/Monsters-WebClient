import '../style/terminal.css';
import type { ForwardedRef } from 'react';
import React, { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import type { IMiddleware, TerminalProps } from '../types';
import newUserCommand from '../controllers/api';
import { useHistoryStore, useProfileStore } from '../zustand/store';
import { EUserCommands } from '../enums';
import { initMessage, uninitializedProfile } from '../constants/clientCommands';
import Portal from './Portal';
import { Button } from './ui/button';
import ReportBugForm from './forms/ReportBugForm';


const Terminal = forwardRef((props: TerminalProps, ref: ForwardedRef<HTMLDivElement>) => {
  const inputRef = useRef<HTMLInputElement>();


  const [input, setInputValue] = useState<string>('');
 const [terminalRef, setDomNode] = useState<HTMLDivElement>();
   const setTerminalRef = useCallback((node: HTMLDivElement) => setDomNode(node), []);

  const { promptLabel = '>',account,profile } = props;

  const history = useHistoryStore((state) => state.history);
  const add = useHistoryStore((state) => state.addToHistory);
  const clearTerminal = useHistoryStore((state)=>state.clearHistory);

console.log(profile);


  const focusInput = useCallback(() => {
    inputRef.current?.focus();
  }, []);


useEffect(()=>{

const msg =initMessage();
add(msg);

    if (profile?.data?.initialized && profile && account.login) {
        uninitializedProfile({ userLogin: account.login })
            .then((data) => add(data))
            .catch((error) => console.error(error)); // Obsługa ewentualnych błędów
    }
},[]);

  useEffect(() => {
    const windowResizeEvent = () => {
      terminalRef?.scrollTo({
        top: terminalRef?.scrollHeight ?? 99999,
        behavior: 'smooth',
      });
    };
    window.addEventListener('resize', windowResizeEvent);

    return () => {
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
      newUserCommand(input, add,clearTerminal,profile).catch((e) => console.log(e));
      scrollToBottom();
    }
  };

  return (
    <div className="terminal  " ref={setTerminalRef} onClick={focusInput}>
      {history.map((line, index) => {
        // const action = Commands[target as keyof typeof Commands];

        return (
          <div className="terminal__line" key={`terminal-line-${index}-${line}`}>
            {line}
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

<div className='fixed top-2 right-[170px]' >
  <Portal button={<Button className='bg-rose-900 hover:bg-rose-800 font-semibold'>Report Bug</Button>}>
<ReportBugForm/>
                </Portal></div>
    </div>
  );
});

export default Terminal;
