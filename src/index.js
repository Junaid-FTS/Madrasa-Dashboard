import React from 'react';

import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';

// react router dom 
import { BrowserRouter } from 'react-router-dom'

// redux tootkit
import { store } from './Redux/store';
import { Provider } from 'react-redux';

//  component
import App from './App';

// css
import './index.scss';





const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log());
