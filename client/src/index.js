import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Gameselection from './Gameselection';

ReactDOM.render(
  <React.StrictMode>
    <App />
    <Gameselection /> 
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
