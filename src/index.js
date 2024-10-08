import React from 'react';
import ReactDOM from 'react-dom/client';
import { v4 as uuidv4 } from 'uuid';
import './styles/reset.css';
import './styles/variables.css';
import './styles/global.css';
import Main from './Main';

const sessionId = sessionStorage.getItem('sessionId') || uuidv4();

sessionStorage.setItem('sessionId', sessionId);
console.log('Your session ID:', sessionId);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);
