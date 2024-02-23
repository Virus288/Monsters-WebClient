import { useCallback } from 'react';
import { useTerminal } from './useTerminal';

const useCommands = () => {
  const { pushToHistory, resetTerminal } = useTerminal();

  const start = async () => {
    await pushToHistory(
      <>
        <div>
          <strong>Starting</strong> the server...{" "}
          <span style={{ color: "green" }}>Done</span>
        </div>
      </>
    );
  };

  const help =  () => {
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
      </div>
    );
  };

 

  const alert = () => {
    alert("Hello!");
    pushToHistory(
      <>
        <div>
          <strong>Alert</strong>
          <span style={{ color: "orange", marginLeft: 10 }}>
            <strong>Shown in the browser</strong>
          </span>
        </div>
      </>
    );
  };

return help
};

export default useCommands;
