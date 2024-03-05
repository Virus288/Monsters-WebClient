import '../style/terminal.css';
import type { ForwardedRef } from 'react';
import React, { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import type { IMiddleware, TerminalProps } from '../types';
import * as Commands from '../hooks/useCommands';
import newUserCommand from '../controllers/api';
import { useHistoryStore, useProfileStore } from '../zustand/store';
import { EUserCommands } from '../enums';

const Terminal = forwardRef((props: TerminalProps, ref: ForwardedRef<HTMLDivElement>) => {
  const inputRef = useRef<HTMLInputElement>();
  const [input, setInputValue] = useState<string>('');
  const [middleware, setMiddleware] = useState<IMiddleware>({ data: undefined, state: EUserCommands.MAP });

  const { promptLabel = '>' } = props;
  const isInitialized = useProfileStore((state) => state.profile?.initialized);
  const history = useHistoryStore((state) => state.history);
  const add = useHistoryStore((state) => state.addToHistory);

  useEffect(() => {
    if (!isInitialized) {
      add('unnitializedProfile');

      setMiddleware({ ...middleware, state: EUserCommands.UNNITALIZED });
    }
  }, []);

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
      setInputValue('');
      newUserCommand(input, middleware, setMiddleware, add).catch((e) => console.log(e));
    }
  };

  return (
    <div className="terminal " ref={ref} onClick={focusInput}>
      {history.map((line, index) => {
        const action = Commands[line as keyof typeof Commands];

        return (
          <div className="terminal__line" key={`terminal-line-${index}-${line}`}>
            {action()}
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
