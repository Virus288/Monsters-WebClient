import type React from 'react';
import { useEffect, useMemo } from 'react';
import { useMainDispatch } from '../../../redux/hooks';
import Controller from '../controller';

const Websocket: React.FC = () => {
  const dispatch = useMainDispatch();
  const controller = useMemo(() => {
    return new Controller(dispatch);
  }, [dispatch]);

  useEffect(() => {
    controller.init();
  }, [controller]);

  return null;
};

export default Websocket;
