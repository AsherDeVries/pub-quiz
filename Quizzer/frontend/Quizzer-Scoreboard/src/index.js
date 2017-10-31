/* eslint-disable import/default */

import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import configureStore from './store/configureStore';
import Root from './components/Root';

import 'uikit/dist/css/uikit.min.css'
import 'uikit/dist/js/uikit.min.js'
import './styles/style.css';

const store = configureStore();

//import './styles/styles.scss'; // Yep, that's right. You can import SASS/CSS files too! Webpack will run the associated loader and plug this into the page.
//require('./favicon.ico'); // Tell webpack to load favicon.ico
//const store = configureStore();

render(
  <AppContainer>
    <Root store={store} />
  </AppContainer>,
  document.getElementById('app')
);

if (module.hot) {
  const rootComponentPath = './components/Root';
  module.hot.accept(rootComponentPath, () => {
    const NewRoot = require(rootComponentPath).default;
    render(
      <AppContainer>
        <NewRoot store={store}/>
      </AppContainer>,
      document.getElementById('app')
    );
  });
}
