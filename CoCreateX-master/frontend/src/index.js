import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';  // Import Bootstrap
import App from './App';

// Create the necessary HTML structure directly in JavaScript
const newElement = document.createElement("div");
newElement.textContent = "Your content";
document.body.appendChild(newElement);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


