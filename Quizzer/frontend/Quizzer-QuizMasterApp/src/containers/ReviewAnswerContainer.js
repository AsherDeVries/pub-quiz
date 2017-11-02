import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Flex from 'react-uikit-flex';
import Panel from 'react-uikit-panel';
import Grid from 'react-uikit-grid';
import Button from 'react-uikit-button';

import TeamAnswerListComponent from '../components/team/TeamAnswerListComponent';
import { closeQuestion, submitAnswerReview } from '../actions/quiznightActions';



class ReviewAnswerContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      approvedAnswers: [],
      closed: false
    };
    this.handleApproveClick = this.handleApproveClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose() {
    this.setState({
      closed: true
    }, () => {
      closeQuestion(this.props.currentQuestion);
    });
  }

  handleApproveClick(team, isCorrect) {
    if(isCorrect) {
      this.setState({
        approvedAnswers: [...this.state.approvedAnswers, team]
      });
    }
    else {
      const newState = this.state.approvedAnswers.filter(answer => (answer.team !== team.team));
      this.setState({
        approvedAnswers: newState
      });
    }
  }

  render() {
    return (
      <div>
        <Panel textAlign="center">
          <h1>{this.props.currentQuestion._id} ({`${this.props.seqNr}/${this.props.total}`})</h1>
          <p>Correct answer: <i>{this.props.currentQuestion.questionAnswer} </i></p>
        </Panel>
        <Grid>
          <TeamAnswerListComponent
            answers={this.props.currentSubmittedAnswers}
            handleApproveClick={this.handleApproveClick}
            closed={this.state.closed}
          />
        </Grid>

        <br />
        <Flex center row="wrap">
          <Button body="Close Question" context="primary" size="large" margin="left" disabled={this.state.closed} onClick={this.handleClose} />
          <Button body="Submit Grades" context="primary" size="large" margin="left" disabled={!this.state.closed} onClick={() => this.props.submitAnswerReview(this.props.currentQuestion, this.state.approvedAnswers)}/>
        </Flex>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentQuestion: state.quiznightReducer.currentQuestion,
    currentSubmittedAnswers: state.quiznightReducer.currentSubmittedAnswers,
    seqNr: state.quiznightReducer.questionSequenceNr,
    total: state.quiznightReducer.questionsPerRound
  };
}

ReviewAnswerContainer.propTypes = {
  currentQuestion: PropTypes.object,
  currentSubmittedAnswers: PropTypes.array,
  closeQuestion: PropTypes.func,
  submitAnswerReview: PropTypes.func,
  seqNr: PropTypes.number,
  total: PropTypes.number
};

export default connect(mapStateToProps, {submitAnswerReview, closeQuestion})(ReviewAnswerContainer);
