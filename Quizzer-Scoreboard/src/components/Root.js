import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ConnectedRouter } from 'react-router';
import App from './App';

export default class Root extends Component {
  render() {
    return (
      <ConnectedRouter>
        <App />
      </ConnectedRouter>
    );
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};