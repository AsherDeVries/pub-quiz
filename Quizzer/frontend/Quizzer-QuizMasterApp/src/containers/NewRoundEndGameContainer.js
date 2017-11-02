import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FlatButton from 'material-ui/FlatButton';

import { startRound, endGame } from '../actions/gameActions';

class NewRoundEndGameContainer extends Component {
  handleStartRound() {
    this.props.startRound();
  }
  
  handleEndGame() {
    this.props.endGame();
  }
  
  render() {
    return (
      <div>
        <h1>Do you want to start a new round or end the game?</h1>
        <FlatButton
          backgroundColor="#f2f2f2"
          label="New round"
          labelPosition="before"
          primary={true}
          onClick={() => this.handleStartRound()}
        />
        <FlatButton
          backgroundColor="#f2f2f2"
          label="End game"
          labelPosition="before"
          primary={true}
          onClick={() => this.handleEndGame()}
        />
      </div>
    );
  }
}

NewRoundEndGameContainer.propTypes = {
  startRound: PropTypes.func,
  endGame: PropTypes.func
};

export default connect(null, {startRound, endGame})(NewRoundEndGameContainer);