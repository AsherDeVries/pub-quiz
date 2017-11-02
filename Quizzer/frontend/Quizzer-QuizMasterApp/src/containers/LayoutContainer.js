import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import NotFoundPageComponent from '../components/NotFoundPageComponent';
import StartGameContainer from './StartGameContainer';
import GameContainer from './GameContainer';
import * as GAME_STATE from '../constants/gameState';

class LayoutContainer extends Component {

  renderGameIfGameStateIsNotIdle() {
    if (this.props.gameState !== GAME_STATE.IDLE) {
      return  <GameContainer />;
    }
    else {
      return  <Redirect to="/" />;
    }
  }

  renderStartScreenIfGameStateIsIdle() {
    if (this.props.gameState === GAME_STATE.IDLE) {
      return <StartGameContainer />;
    }
    else {
      return  <Redirect to="/game" />;
    }
  }

  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" render={() => this.renderStartScreenIfGameStateIsIdle()} />
          <Route path="/game" render={() => this.renderGameIfGameStateIsNotIdle()}/>
          <Route component={NotFoundPageComponent} />
        </Switch>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    gameState: state.gameStateReducer.gameState
  };
}

LayoutContainer.propTypes = {
  gameState: PropTypes.string.isRequired
};

export default withRouter(connect(mapStateToProps)(LayoutContainer));