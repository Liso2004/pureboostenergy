import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { WishlistProvider } from './context/WishlistContext';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <WishlistProvider> {/* ✅ Wrap App with WishlistProvider */}
        <App />
      </WishlistProvider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
