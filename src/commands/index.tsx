import type { TerminalHistoryItem } from '../types/terminal';

export const start = (pushToHistory: (item: TerminalHistoryItem) => void): void => {
  pushToHistory(
    <div>
      <strong>Starting</strong> the server... <span style={{ color: 'green' }}>Done</span>
    </div>,
  );
};

export const loadStatus = (pushToHistory: (item: TerminalHistoryItem) => void): void => {
  pushToHistory(
    <>
      <div className="text-normal">
        Welcome
        <span className="text-orange-400 ml-1 mr-1">
          <strong>{user}</strong>
        </span>
        Nice to see You !
      </div>
      <br />
      <div>You can write: 'help' , to check list of avalible commands.</div>
    </>,
  );
};

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

const alert = (pushToHistory: (item: TerminalHistoryItem) => void): void => {
  pushToHistory(
    <div>
      <strong>Alert</strong>
      <span style={{ color: 'orange', marginLeft: 10 }}>
        <strong>Shown in the browser</strong>
      </span>
    </div>,
  );
};
