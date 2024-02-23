import { useCallback, useEffect, useMemo } from "react";
import { Terminal } from "../../components/Terminal";
import { useTerminal } from "../../hooks/useTerminal";
import { useAccountStore, useCounterStore, useProfileStore } from "../../zustand/store";

const Home = () => {
  const account = useAccountStore.getState().account;
const profile = useProfileStore.getState().profile



  const {
    history,
    pushToHistory,
    setTerminalRef,
    resetTerminal,
    invalidCommand,
  } = useTerminal();

  const user = "Adam";

  useEffect(() => {
    resetTerminal();

    start();
    loadStatus();
  }, []);

  const loadStatus = async () => {
    await pushToHistory(
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
      </>
    );
  };

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

  const help = async () => {
    await pushToHistory(
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

  const helps = () => [
    "Here are all the commands you can use:",
    "- game init",
    "- alert",
    "- races",
    "- profile",
    "- messages",
    "- sendMsg",
    "- clear",
    "- exit",
  ];

  const commands = {
    help: "help",
    start: "start",
  };

  return (
    <div className="h-full w-full flex justify-center">
      <div>{JSON.stringify(account)}</div>
      <div>{JSON.stringify(profile)}</div>
      <Terminal
        history={history}
        ref={setTerminalRef}
        promptLabel={<div className="text-green-400">You{" >>"}</div>}
        commands={commands}
      />
    </div>
  );
};

export default Home;
