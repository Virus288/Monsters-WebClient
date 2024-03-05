import React from 'react';
import { useAccountStore, useProfileStore } from '../zustand/store';

export const unnitializedProfile: React.FC = () => {
  const userLogin = useAccountStore.getState().account?.login;

  return (
    <div className="flex flex-col">
      <span>
        <span className="text-yellow-700 font-semibold">Jessica</span> &gt;&gt; Welcome {userLogin} My name is Jessica.
        Welcome to our adventure guild. In order to register as an adventurer, I need you to provide me with some
        information.
      </span>
      <span className="">[You pick up registration form]</span>
      <span className="">First question is: What your race ?</span>
    </div>
  );
};

export const start: React.FC = () => {
  return (
    <div>
      <strong>Starting</strong> the server... <span style={{ color: 'green' }}>Done</span>
    </div>
  );
};

export const mycharacter: React.FC = () => {
  const { data } = useProfileStore.getState().profile;

  return (
    <div className="flex flex-col">
      <span>Race:{data.race}</span>
      <span>Lvl:{data.lvl}</span>
      <span />
    </div>
  );
};

export const help: React.FC = () => {
  return (
    <div className="flex flex-col">
      <p className="font-semibold">For more information on a specific command, type HELP command-name</p>
      <span>- game init</span>
      <span>- start</span>
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

export const InvalidCommand: React.FC = () => {
  return (
    <div>
      <span className="text-rose-800">InvalidCommand</span>
    </div>
  );
};

export const races: React.FC = () => {
  return (
    <div className="flex flex-col">
      <span>Human</span>
      <span>Elf</span>
      <span>Goblin</span>
      <span>Dwarf</span>
      <span>Orc</span>
      <span>Fairy</span>
      <span>DragonBorn</span>
    </div>
  );
};

export const confirmationWindow: React.FC = () => {
  return <div className="flex">Human ....</div>;
};

export const confirmationSuccesWindow: React.FC = () => {
  return <div className="flex">Race has been picked sucessfully.</div>;
};
