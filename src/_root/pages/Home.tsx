import React, { useEffect } from 'react';
import Terminal from '../../components/Terminal';
import { initApp } from '../../controllers';
import { useFightsStore, useHistoryStore, useLogsStore, useMessagesStore } from '../../zustand/store';
import type { IUser, IUserProfile } from '../../types';
import WebSocket from '../../components/Websocket';

const Home: React.FC<{
  account: IUser;
  profile: IUserProfile;
  addProfile: (profile: IUserProfile) => void;
}> = ({ account, profile, addProfile }) => {
  const initHistory = useHistoryStore((state) => state.initHistory);
  const addMessages = useMessagesStore((state) => state.addMessages);
  const addLogs = useLogsStore((state) => state.setLogs);
  const addFight = useFightsStore((state) => state.addCurrentFight);

  useEffect(() => {
    initApp(addMessages, addLogs, profile, addFight)
      .then((logs) => {
        const preparedLogs =
          logs.length > 0
            ? logs.map((l) => {
                return { message: l.message, target: l.target };
              })
            : [];
        return initHistory(preparedLogs);
      })
      .catch((err) => {
        console.log('Cannot init app', err);
      });
  });

  return (
    <div className="h-full w-full flex justify-center ">
      <WebSocket />
      <Terminal
        profile={profile}
        account={account}
        addProfile={addProfile}
        promptLabel={<div className="text-green-400">You{' >>'}</div>}
      />
    </div>
  );
};

export default Home;
