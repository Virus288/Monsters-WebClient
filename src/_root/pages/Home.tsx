import React, { useEffect } from 'react';
import Terminal from '../../components/Terminal';
import { initApp } from '../../controllers';
import { useLogsStore, useMessagesStore } from '../../zustand/store';
import type { IUser, IUserProfile } from '../../types';

const Home: React.FC<{ account: IUser; profile: IUserProfile }> = ({ account, profile }) => {
  const addMessages = useMessagesStore((state) => state.addMessages);
  const addLogs = useLogsStore((state) => state.setLogs);

  useEffect(() => {
    initApp(addMessages, addLogs).catch((err) => {
      console.log('Cannot init app', err);
    });
  });

  return (
    <div className="h-full w-full flex justify-center ">
      <Terminal profile={profile} account={account} promptLabel={<div className="text-green-400">You{' >>'}</div>} />
    </div>
  );
};

export default Home;
