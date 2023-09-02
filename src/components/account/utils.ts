import type React from 'react';

// eslint-disable-next-line import/prefer-default-export
export const animateExit = (setExit: React.Dispatch<React.SetStateAction<boolean>>, setView: () => void): void => {
  setExit(false);
  setTimeout(() => {
    setView();
    setExit(true);
  }, 500);
};
