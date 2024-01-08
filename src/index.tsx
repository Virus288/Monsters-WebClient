import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'normalize.css';
import { NoRoot } from './errors';
import './style/fontello/css/fontello.css';

const target = document.getElementById('root');
if (!target) throw new NoRoot();

const root = ReactDOM.createRoot(target);

const Root: React.FC = () => {
  return <App />;
};

root.render(<Root />);
