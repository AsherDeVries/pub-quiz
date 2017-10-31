import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FlatButton from 'material-ui/FlatButton';

import WithLoading from '../components/shared/WithLoading';
import { startGame } from '../actions/gameActions';

class StartGameContainer extends Component {

  handleGameStart() {
    this.props.startGame();
  }

  render() {
    return (
      <div>
        <WithLoading loadingState={this.props.startGameRequestState} message="Starting game.." >
          <h1>Welcome to quizzer!!</h1>
          <FlatButton
            label="Start quizzer"
            labelPosition="before"
            primary={true}
            onClick={() => this.handleGameStart()}
          />
        </WithLoading >
      </div>
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