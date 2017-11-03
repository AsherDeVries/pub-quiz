import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from 'react-uikit-button';
import Flex from 'react-uikit-flex';
import Panel from 'react-uikit-panel';

import WithLoading from '../components/shared/WithLoading';
import { startGame } from '../actions/gameActions';

class StartGameContainer extends Component {

  handleGameStart() {
    this.props.startGame();
  }

  render() {
    return (
      <Flex center middle viewport>
        <Panel>
          <WithLoading loadingState={this.props.startGameRequestState} message="Starting game.." >
            <h1>Welcome to quizzer!!</h1>
            <Flex center>
              <Button body="Start Quizzer" context="primary" onClick={() => this.handleGameStart()}/>
            </Flex>
          </WithLoading>
        </Panel>
      </Flex>
    );
  }
}

function mapStateToProps(state) {
  return {
    startGameRequestState: state.gameStateReducer.startGameRequestState
  };
}

StartGameContainer.propTypes = {
  startGameRequestState: PropTypes.string,
  startGame: PropTypes.func
};

export default connect(mapStateToProps, {startGame})(StartGameContainer);
