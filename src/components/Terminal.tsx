import './terminal.css';
import {ForwardedRef, forwardRef, useCallback, useEffect, useRef, useState} from "react";
import {TerminalProps} from "./types";
import { useTerminal } from '../hooks/useTerminal';


export const Terminal = forwardRef(
  (props: TerminalProps, ref: ForwardedRef<HTMLDivElement>) => {
    const {
      history = [],
      promptLabel = '>',
 
      commands = {},
    } = props;

    const inputRef = useRef<HTMLInputElement>();
    const [input, setInputValue] = useState<string>('');

    const {  pushToHistory, setTerminalRef, resetTerminal,invalidCommand } =
    useTerminal();
    /**
     * Focus on input when render  terminal or click in the terminal
     */
    useEffect(() => {
      inputRef.current?.focus();
    });

    const focusInput = useCallback(() => {
      inputRef.current?.focus();
    }, []);
    console.log(commands)

    /**
     * When user types something, update input value
     */
    const handleInputChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
      },
      []
    );





    /**
     * When user presses enter, execute command
     */
    const handleInputKeyDown = useCallback(
        (e: React.KeyboardEvent<HTMLInputElement>) => {
            const keys = Object.keys(commands);
            const isValid = keys.includes(input.toLowerCase());

          if (e.key === 'Enter') {
            const commandToExecute = commands?.[input.toLowerCase()];
            if (!commandToExecute) {
              
              invalidCommand()
            }
            else{
                
                commandToExecute?.();
            }
        
           
            setInputValue('');
          }
         
        },
        [commands, input]
      );

    return (
    <div className="terminal" ref={ref} onClick={focusInput}>
      {history.map((line, index) => (
        <div className="terminal__line" key={`terminal-line-${index}-${line}`}>
          {line}
        </div>
      ))}
      <div className="terminal__prompt">
        <div className="terminal__prompt__label">{promptLabel}</div>
        <div className="terminal__prompt__input">
          <input
            type="text"
            value={input}
            onKeyDown={handleInputKeyDown}
            onChange={handleInputChange}
            // @ts-ignore
            ref={inputRef}
          />
        </div>
      </div>
    </div>
  );
});