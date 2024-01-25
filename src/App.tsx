import React, { useState } from 'react';
import type { DefaultTheme } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import * as themes from './style/theme/themes';
import ViewsController from './ViewsController';
import store from './redux/store';
import { GlobalStyle } from './shared/styled';
import Theme from './style/theme';

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
