import React from 'react';
import { MessageCounter } from '../themed';

const Counter: React.FC<{ unread: number }> = ({ unread }) => {
  return unread > 0 ? <MessageCounter>{unread}</MessageCounter> : null;
};

export default Counter;
