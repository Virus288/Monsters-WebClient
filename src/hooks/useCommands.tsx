import React from 'react';


export const start = () => {
  return (
    <div>
      <strong>Starting</strong> the server... <span style={{ color: 'green' }}>Done</span>
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
