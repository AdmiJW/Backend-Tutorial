import React from 'react';
import ReactDOM from 'react-dom';
import MainPage from './Mainpage';

// Initialized firestore here
import firestore from './firestore';

ReactDOM.render(
  <React.StrictMode>
    <MainPage />
  </React.StrictMode>,
  document.getElementById('root')
);