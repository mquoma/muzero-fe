import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router';
import Root, { store } from './Root';
//import './css/main.css';

// const app = document.createElement('div');
// document.body.appendChild(app);

const app = document.getElementById('app');

export default browserHistory;

render (
  <Provider store={store}>
    <Root history={browserHistory} />
  </Provider>, app );

