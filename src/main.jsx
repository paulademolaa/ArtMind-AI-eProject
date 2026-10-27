// The starting point of the app: it puts <App /> inside the <div id="root"> in index.html.
import React from 'react';
import ReactDOM from 'react-dom/client';
// Global styles must load FIRST, so page styles (loaded by App) can override them.
import './index.css';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
