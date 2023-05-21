import React, { useState } from 'react';
import type { DefaultTheme } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import * as themes from './components/customs/theme';
import Theme, { GlobalStyle } from './components/customs';
import ViewsController from './components/generic/views/ViewsController';

const App: React.FC = () => {
  const [theme, setTheme] = useState<DefaultTheme>(themes.lightTheme);

  return (
    <Theme theme={theme}>
      <BrowserRouter>
        <GlobalStyle />
        <ViewsController setTheme={setTheme} />
      </BrowserRouter>
    </Theme>
  );
};

export default App;
