import type { TerminalHistoryItem } from '../types';

// eslint-disable-next-line import/prefer-default-export
export const help = (pushToHistory: (item: TerminalHistoryItem) => void): void => {
  pushToHistory(
    <div className="flex flex-col">
      <p className="font-semibold">Here are all the commands you can use:</p>
      <span>- game init</span>
      <span>- alert</span>
      <span>- races</span>
      <span>- profile</span>
      <span>- messages</span>
      <span>- messages</span>
      <span>- sendMsg</span>
      <span>- clear</span>
      <span>- exit</span>
    </div>,
  );
};
