import React, { type ReactElement } from 'react';
import { ThemedText } from '../../../shared/styled';

// eslint-disable-next-line import/prefer-default-export
export const renderCommands = (commands: Record<string, string>): ReactElement[] => {
  return Object.entries(commands).map((c) => {
    return (
      <React.Fragment key={`$${c[0]} ${c[1]}`}>
        <ThemedText>
          <h5>{c[0]}</h5>
        </ThemedText>
        <h4>{c[1] ? c[1].charAt(0).toUpperCase() + c[1].slice(1) : 'No available description'}</h4>
      </React.Fragment>
    );
  });
};
