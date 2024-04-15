import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {FirebaseProvider} from './context/FirebaseContext';
import { initializeApp } from 'firebase/app';
import { BrowserRouter } from 'react-router-dom';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <FirebaseProvider>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </FirebaseProvider>
  </React.StrictMode>
);
