import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Flex from 'react-uikit-flex';
import Grid from 'react-uikit-grid';
import Button from 'react-uikit-button';

import { createNewRound, endGame } from '../actions/gameActions';

class NewRoundEndGameContainer extends Component {
  handlecreateNewRound() {
    this.props.createNewRound();
  }

  handleEndGame() {
    this.props.endGame();
  }

  render() {
    return (
      <Flex center middle viewport row="wrap" direction="column">
          <h1>Do you want to start a new round or end the game?</h1>
          <Grid>
            <Button body="New Round" margin="left" context="primary" onClick={() => this.handlecreateNewRound()}/>
            <Button body="End Game" margin="left" context="primary"  onClick={() => this.handleEndGame()}/>
          </Grid>
      </Flex>
    );
  }
}

NewRoundEndGameContainer.propTypes = {
  createNewRound: PropTypes.func,
  endGame: PropTypes.func
};

export default connect(null, {createNewRound, endGame})(NewRoundEndGameContainer);
