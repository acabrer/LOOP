import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; // Import the App component from a separate file
import './styles/main.css';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root') // Ensure there is a div with id 'root' in your HTML file
);