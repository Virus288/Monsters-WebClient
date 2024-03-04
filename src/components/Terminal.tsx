import './terminal.css';
import type { ForwardedRef} from 'react';
import React, { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import type { TerminalProps } from '../types';
import useTerminal from '../hooks/useTerminal';
import * as Commands from '../hooks/useCommands';
import { useHistoryStore, useProfileStore } from '../zustand/store';

const Terminal = forwardRef((props: TerminalProps, ref: ForwardedRef<HTMLDivElement>) => {
  const { promptLabel = '>' } = props;

const isInitialized = useProfileStore((state)=>state.profile.data.initialized);

const history = useHistoryStore((state)=> state.history);



const add = useHistoryStore(state => state.addToHistory);



useEffect(()=>{
  if(!isInitialized)
  add('unnitializedProfile');
},[]);

  const inputRef = useRef<HTMLInputElement>();
  const [input, setInputValue] = useState<string>('');


  /**
   * Focus on input when render  terminal or click in the terminal
   */
  useEffect(() => {
    inputRef.current?.focus();
  });

  const focusInput = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  /**
   * When user types something, update input value
   */
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }, []);

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      const availableCommandList = Object.keys(Commands);

      const isCommandValid = availableCommandList.includes(input.toLocaleLowerCase());

      if (!isCommandValid) {
        setInputValue('');
        add('InvalidCommand');
        return;
      }
      add(input);
      setInputValue('');
    }
  };

console.log(history);
  return (
    <div className="terminal " ref={ref} onClick={focusInput}>
      {history.map((line, index) => {
        const Prompt = Commands[line as keyof typeof Commands];

  console.log(line);
  console.log('line');
        return (
          <div className="terminal__line" key={`terminal-line-${index}-${line}`}>

    {      Prompt()}
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
    </div>
  );
});

export default Terminal;
