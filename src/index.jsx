import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx'; // adjust path if your App.jsx is nested

// Wait for DOM to load
const container = document.getElementById('root'); // CRA uses 'root' not 'react-target'
const root = createRoot(container);
root.render(<App />);
