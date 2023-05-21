import type React from 'react';
import type { DefaultTheme } from 'styled-components';
import { EThemes } from '../../enums';
import * as themes from '../customs/theme';

const changeTheme = (setTheme: React.Dispatch<React.SetStateAction<DefaultTheme>>, theme: DefaultTheme): void => {
  if (theme.themeState === EThemes.Light) return setTheme(themes.darkTheme);
  return setTheme(themes.lightTheme);
};

export default changeTheme;
