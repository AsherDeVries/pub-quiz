import React, { Component } from 'react';
import PropTypes from 'prop-types';
import App from './App';
import uikit from 'react-uikit-base';

export default class Root extends Component {
  render() {
    return (
        <App />
    );
  }
}
uikit.base(Root);
