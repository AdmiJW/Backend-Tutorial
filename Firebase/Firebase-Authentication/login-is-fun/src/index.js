import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// Firebase init
import './initializeFirebase';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);