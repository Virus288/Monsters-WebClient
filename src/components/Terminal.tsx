import './terminal.css';
import type { ForwardedRef } from 'react';
import { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import type { TerminalProps } from '../types';
import { useTerminal } from '../hooks/useTerminal';
import * as Commands from '../hooks/useCommands';

export const Terminal = forwardRef((props: TerminalProps, ref: ForwardedRef<HTMLDivElement>) => {
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

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      const avalibleCommandList = Object.keys(Commands);

      const isCommandValid = avalibleCommandList.includes(input.toLocaleLowerCase());

      if (!isCommandValid) {
        setInputValue('');
        return pushToHistory('InvalidCommand');
      }
      pushToHistory(input);
      setInputValue('');
    }
  };

  return (
    <div className="terminal" ref={ref} onClick={focusInput}>
      {history.map((line, index) => {
        const prompt = Commands[line];

        return (
          <div className="terminal__line" key={`terminal-line-${index}-${line}`}>
            {prompt()}
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
            // @ts-expect-error
            ref={inputRef}
          />
        </div>
      </div>
    </div>
  );
});
