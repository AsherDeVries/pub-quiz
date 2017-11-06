import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import configureStore from './store/configureStore';
import Root from './components/Root';

import 'uikit/dist/js/uikit.min';
import './styles/style.scss';

const store = configureStore();

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
