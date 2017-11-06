import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Flex from 'react-uikit-flex';

import WithLoading from '../components/shared/WithLoading';
import AnswerQuestion from '../components/AnswerQuestion';

import { submitAnswer } from '../actions/quizActions';

class GameContainer extends Component {
  submitAnswer(questionId, answer, reSubmit) {
    this.props.submitAnswer(questionId, answer, reSubmit);
  }

  render() {
    return (
      <Flex center middle viewport row="wrap" direction="column">
        <WithLoading loadingState={this.props.loadingState} message={this.props.message}>
          <AnswerQuestion
            question={this.props.currentQuestion}
            submitAnswer={this.submitAnswer.bind(this)}
          />
        </WithLoading>
      </Flex>
    );
  }
}

function mapStateToProps(state) {
  return {
    teamName: state.sessionReducer.teamName,
    loadingState: state.quizReducer.questionWebsocketState,
    message: state.quizReducer.questionWebsocketMessage,
    currentQuestion: state.quizReducer.currentQuestion
  };
}

GameContainer.propTypes = {
  teamName: PropTypes.string.isRequired,
  loadingState: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  submitAnswer: PropTypes.func,
  currentQuestion: PropTypes.object,
};

export default connect(mapStateToProps, { submitAnswer })(GameContainer);
