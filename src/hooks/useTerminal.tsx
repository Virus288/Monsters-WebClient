import { useCallback, useEffect, useState } from 'react';
import type { TerminalHistoryItem } from '../types';

export const useTerminal = () => {
  const [terminalRef, setDomNode] = useState<HTMLDivElement>();
  const setTerminalRef = useCallback((node: HTMLDivElement) => setDomNode(node), []);

  const [history, setHistory] = useState(['start']);

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

  /**
   * Scroll to bottom of  terminal on every new history item
   */
  useEffect(() => {
    terminalRef?.scrollTo({
      top: terminalRef?.scrollHeight ?? 99999,
      behavior: 'smooth',
    });
  }, [history, terminalRef]);

  const pushToHistory = useCallback((item: TerminalHistoryItem) => {
    setHistory((old) => [...old, item]);
  }, []);

  /**
   * Write text to terminal
   * @param content The text to be printed in  terminal
   * @param delay The delay in ms before  text is printed
   * @param executeBefore The function to be executed before  text is printed
   * @param executeAfter The function to be executed after  text is printed
   */

  /**
   * Reset terminal window
   */
  const resetTerminal = useCallback(() => {
    setHistory([]);
  }, []);

  const invalidCommand = async () => {
    await pushToHistory(<div>Invalid Command</div>);
  };

  return {
    history,
    pushToHistory,

    invalidCommand,
    terminalRef,
    setTerminalRef,

    resetTerminal,
    setHistory,
  };
};
