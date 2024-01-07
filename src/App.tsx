import React, { useState } from 'react';
import type { DefaultTheme } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import * as themes from './components/customs/theme';
import Theme, { GlobalStyle } from './components/customs';
import ViewsController from './components/generic/views/ViewsController';
import store from './redux/store';

const App: React.FC = () => {
  const [theme, setTheme] = useState<DefaultTheme>(themes.lightTheme);

  return (
    <Theme theme={theme}>
      <Provider store={store}>
        <BrowserRouter>
          <GlobalStyle />
          <ViewsController setTheme={setTheme} />
        </BrowserRouter>
      </Provider>
    </Theme>
  );
};

export default App;
