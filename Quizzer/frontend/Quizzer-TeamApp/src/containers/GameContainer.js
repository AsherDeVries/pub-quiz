import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import WithLoading from '../components/shared/WithLoading';

class GameContainer extends Component {
  render() {
    return (
      <div>
        <WithLoading loadingState={this.props.loadingState} message={this.props.message}>
          <h1>Welcome {this.props.teamName}</h1>
        </WithLoading>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    teamName: state.sessionReducer.teamName,
    loadingState: state.quizReducer.questionWebsocketState,
    message: state.quizReducer.questionWebsocketMessage
  };
}

GameContainer.propTypes = {
  teamName: PropTypes.string.isRequired,
  loadingState: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired
};

export default connect(mapStateToProps)(GameContainer);