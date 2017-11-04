import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Flex from 'react-uikit-flex';

import WithLoading from '../components/shared/WithLoading';
import AnswerQuestion from '../components/AnswerQuestion';

import { submitAnswer } from '../actions/quizActions';

class GameContainer extends Component {
  renderQuestionIfThereIsOne() {
    if(this.props.questionState) {
      return (
        <AnswerQuestion question={this.props.currentQuestion.question}
                        category={this.props.currentQuestion.category}
                        submitAnswer={this.props.submitAnswer}
        />
      );
    } else {
      return <h1>Welcome {this.props.teamName}</h1>;
    }
  }

  render() {
    return (
      <Flex center middle viewport row="wrap" direction="column">
          <WithLoading loadingState={this.props.loadingState} message={this.props.message}>
            {this.renderQuestionIfThereIsOne()}
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
    currentQuestion: state.quizReducer.currentQuestion,
    questionState: state.quizReducer.questionState,
    isAllowed: state.quizReducer.isAllowed
  };
}

GameContainer.propTypes = {
  teamName: PropTypes.string.isRequired,
  loadingState: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  submitAnswer: PropTypes.func,
  questionState: PropTypes.bool,
  currentQuestion: PropTypes.object,
};

export default connect(mapStateToProps, {submitAnswer})(GameContainer);
