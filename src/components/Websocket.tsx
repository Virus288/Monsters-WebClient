import type React from 'react';
import { useEffect, useMemo } from 'react';
import Controller from '../controllers/websocket';
import { useHistoryStore } from '../zustand/store';

const Websocket: React.FC = () => {
  const add = useHistoryStore((state) => state.addToHistory);

  const controller = useMemo(() => {
    return new Controller(add);
  }, [add]);

  useEffect(() => {
    controller.init();
  }, [controller]);

  return null;
};

export default Websocket;
