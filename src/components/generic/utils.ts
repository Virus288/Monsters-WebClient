import type React from 'react';
import * as enums from '../../enums';

export const toggleSettings = (
  e: React.MouseEvent,
  setSettings: React.Dispatch<React.SetStateAction<boolean>>,
): void => {
  const { id } = e.target as HTMLElement;
  if (id === 'SettingsContainer') setSettings(false);
};

export const toggleNavbar = (
  setAppActive: React.Dispatch<React.SetStateAction<enums.EAppState>>,
  appActive: enums.EAppState,
  e: React.MouseEvent,
): void => {
  if (window.outerWidth >= 767) return;

  const { id, className, parentElement } = e.target as HTMLElement;

  if (
    id !== 'NavbarContainer' &&
    id !== 'NavToggle' &&
    !className.includes('NavButton') &&
    !parentElement!.className.includes('NavButton')
  )
    return;

  if (appActive === enums.EAppState.Inactive) {
    setAppActive(enums.EAppState.Active);
  } else {
    setAppActive(enums.EAppState.Inactive);
  }
};
