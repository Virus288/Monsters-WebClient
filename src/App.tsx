import React, { useState } from 'react';
import type { DefaultTheme } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import * as themes from './components/customs/theme';
import Theme, { GlobalStyle } from './components/customs';
import * as enums from './enums';
import ViewsController from './components/generic/views/ViewsController';

const App: React.FC = () => {
  const [appActive, setAppActive] = useState<enums.EAppState>(enums.EAppState.Inactive);
  const [theme, setTheme] = useState<DefaultTheme>(themes.lightTheme);

  return (
    <Theme theme={theme} appState={appActive}>
      <BrowserRouter>
        <GlobalStyle />
        <ViewsController setTheme={setTheme} setAppActive={setAppActive} appActive={appActive} />
      </BrowserRouter>
    </Theme>
  );
};

export default App;
