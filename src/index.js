import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/reset.css';
import './styles/variables.css';
import './styles/global.css';
import Main from './Main';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);
