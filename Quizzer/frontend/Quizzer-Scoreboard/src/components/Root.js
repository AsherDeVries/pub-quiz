import React, { Component } from 'react';
import PropTypes from 'prop-types';
import App from './App';
import { Provider } from 'react-redux';
import uikit from 'react-uikit-base';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {BrowserRouter} from 'react-router-dom';

export default class Root extends Component {
  render() {
    return (
      <Provider store={this.props.store}>
        <BrowserRouter>
          <MuiThemeProvider>
            <App />
          </MuiThemeProvider>
        </BrowserRouter>
      </Provider>
    );
  }
}
uikit.base(Root);
