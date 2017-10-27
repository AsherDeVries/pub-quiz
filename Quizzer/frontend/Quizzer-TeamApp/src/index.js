import React from 'react';
import ReactDOM from 'react-dom';

import configureStore from './store/configureStore';
import Root from './components/root';

const store = configureStore();

ReactDOM.render(
  <Root store={store} />
  , document.querySelector('.container'));
