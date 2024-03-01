import './terminal.css';
import type { ForwardedRef} from 'react';
import React, { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import type { TerminalProps } from '../types';
import useTerminal from '../hooks/useTerminal';
import * as Commands from '../hooks/useCommands';

const Terminal = forwardRef((props: TerminalProps, ref: ForwardedRef<HTMLDivElement>) => {
  const { promptLabel = '>' } = props;

  const inputRef = useRef<HTMLInputElement>();
  const [input, setInputValue] = useState<string>('');

  const {
    pushToHistory,

    history,
  } = useTerminal();
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
        pushToHistory('InvalidCommand');
        return;
      }
      pushToHistory(input);
      setInputValue('');
    }
  };


  return (
    <div className="terminal" ref={ref} onClick={focusInput}>
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
