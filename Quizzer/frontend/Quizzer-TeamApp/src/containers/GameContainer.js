import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

import WithLoading from '../components/shared/WithLoading';

class GameContainer extends Component {
  render() {
    return (
      <div>
        <WithLoading loadingState={this.props.loadingState} message={this.props.message}>
          <h1>{this.props.teamName}</h1>
          <h2>Round: 1</h2>
          <h2>Question:  </h2>
          <TextField
            id="text-field-controlled"
          />
          <br />
          <FlatButton
            label="Submit answer"
            labelPosition="before"
            primary={true}
          />
        </WithLoading>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    teamName: state.sessionReducer.teamName,
    loadingState: state.quizReducer.websocketWaitingState,
    message: state.quizReducer.websocketMessage
  };
}

GameContainer.propTypes = {
  teamName: PropTypes.string.isRequired,
  loadingState: PropTypes.string.isRequired,
  message: PropTypes.string
};

export default connect(mapStateToProps)(GameContainer);