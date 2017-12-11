import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

// es 2015 import, and export default, can't use logic before import statements,

import App from './components/App';
import reducers from './reducers';
import axios from 'axios';
window.axios = axios;
// provider is a component that makes the store accessible to every component in the app

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root')
);
