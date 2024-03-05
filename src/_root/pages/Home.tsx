import React, { useEffect } from 'react';
import Terminal from '../../components/Terminal';
import useTerminal from '../../hooks/useTerminal';

const Home: React.FC = () => {
  const { history, pushToHistory, setTerminalRef, resetTerminal } = useTerminal();

  const user = 'Adam';

  const start = (): void => {
    pushToHistory(
      <div>
        <strong>Starting</strong> the server... <span style={{ color: 'green' }}>Done</span>
      </div>,
    );
  };

  const loadStatus = (): void => {
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
        <div>You can write: &apos;help&apos; , to check list of available commands.</div>
      </>,
    );
  };

  useEffect(() => {
    resetTerminal();

    start();
    loadStatus();
  }, []);

  const commands = {
    help: 'help',
    start: 'start',
  };

  return (
    <div className="h-full w-full flex justify-center">
      <Terminal
        history={history}
        ref={setTerminalRef}
        promptLabel={<div className="text-green-400">You{' >>'}</div>}
        commands={commands}
      />
    </div>
  );
};

export default Home;
