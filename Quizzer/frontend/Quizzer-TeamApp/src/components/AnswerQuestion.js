import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Panel from 'react-uikit-panel';
import Flex from 'react-uikit-flex';
import Button from 'react-uikit-button';
import TextField from 'material-ui/TextField';

import { submitAnswer } from '../actions/quizActions';

class AnswerQuestion extends React.Component {
  constructor(props) {
    super(props);

    this.state={
      answer: ""
    }
  }

  handleAnswerChange(answer) {
    this.setState({
      answer
    });
  }

  renderSubmitButtonBasedOnAnsweringStatus() {
    console.log(this.props.hasAnswered);
    if(!this.props.hasAnswered) {
      return <Button body="Submit" context="primary" size="large" onClick={this.handleAnswerSubmit()}/>
    } else {
      return <Button body="Resubmit" context="primary" size="large" onClick={this.handleAnswerSubmit()}/>
    }
  }

  handleAnswerSubmit() {
    this.props.submitAnswer(this.state.answer);
  }

  render() {
    return(
      <div>
        <Panel textAlign='center' margin='top'>
          <h1>{this.props.category}</h1>
          <br/>
          <br/>
          <h3>{this.props.question}</h3>
        </Panel>
        <Flex center margin="top" direction="column">
          <Panel center margin="top bottom">
            <TextField
              id="text-field-controlled"
              hintText="Your answer"
              value={this.state.answer}
              onChange={(event) => this.handleAnswerChange(event.target.value)}
            />
          </Panel>
          <Panel center margin="top">
            {this.renderSubmitButtonBasedOnAnsweringStatus()}
          </Panel>
        </Flex>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    hasAnswered: state.questionReducer.hasAnswered
  };
}


AnswerQuestion.propTypes = {
  submitAnswer: PropTypes.func
};

export default connect(mapStateToProps, {submitAnswer})(AnswerQuestion);
