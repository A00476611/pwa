import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

async function registerServiceWorker() {
  // Register service worker
  if ("serviceWorker" in navigator) {
    // checking if the browser supports service workers
    window.addEventListener("load", function () {
      // when app loads, fire callback
      navigator.serviceWorker.register("/service-worker.js").then(
        function () {
          // register sw
          console.log("ServiceWorker registration successful"); // registration was successful
        },
        function (err) {
          console.log("ServiceWorker registration failed", err); // registration failed
        }
      );
    });
  }
}

registerServiceWorker()

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
