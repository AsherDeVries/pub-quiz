import React from 'react';
import PropTypes from 'prop-types';

import Panel from 'react-uikit-panel';
import Flex from 'react-uikit-flex';
import Button from 'react-uikit-button';
import TextField from 'material-ui/TextField';

class AnswerQuestion extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      answer: "",
      hasAnswered: false,
      lastAnswerSubmitted: "",
      errorText: ''
    };
  }

  handleAnswerChange(answer) {
    this.setState({
      answer,
      errorText: (answer.length > 0) ? '' : 'This field is required'
    });
  }

  handleAnswerSubmit() {
    if (this.state.answer !== "") {
      this.props.submitAnswer(this.props.question._id, this.state.answer, this.state.hasAnswered);
      this.setState({
        hasAnswered: true,
        lastAnswerSubmitted: this.state.answer
      });
    }
    else {
      this.setState({
        errorText: "This field is required"
      });
    }
  }

  renderSubmitButtonBasedOnAnsweringStatus() {
    return (
      <Button
        body={(!this.state.hasAnswered) ? "Submit" : "Re-submit"}
        context="primary"
        size="large"
        onClick={() => this.handleAnswerSubmit()}
        disabled={(this.state.answer === this.state.lastAnswerSubmitted || this.state.answer.length < 1)}
      />
    );
  }

  lastSubmittedAnswer() {
    if (this.state.hasAnswered) {
      return `Last answer: ${this.state.lastAnswerSubmitted}`;
    }
    return "Your answer";
  }

  render() {
    return (
      <div>
        <Panel textAlign="center" margin="top">
          <h2>Category: <i>{this.props.question.category}</i></h2>
          <br />
          <br />
          <h3><b>{this.props.question._id}</b></h3>
          <br />
          <br />
        </Panel>
        <Flex center margin="top" direction="column">
          <Panel center margin="top bottom">
            <TextField
              id="text-field-controlled"
              floatingLabelText={this.lastSubmittedAnswer()}
              errorText={this.state.errorText}
              hintText="Your answer"
              value={this.state.answer}
              fullWidth={true}
              onChange={event => this.handleAnswerChange(event.target.value)}
              onKeyUp={event => event.key === "Enter" && this.handleAnswerSubmit()}
            />
            <div>
              {(this.state.hasAnswered && this.state.answer === this.state.lastAnswerSubmitted) && <span><i>Change answer to re-submit</i></span>}
            </div>
          </Panel>
          <Panel center margin="top">
           
            {this.renderSubmitButtonBasedOnAnsweringStatus()}
          </Panel>
        </Flex>
      </div>
    );
  }
}


AnswerQuestion.propTypes = {
  submitAnswer: PropTypes.func,
  question: PropTypes.object
};

export default AnswerQuestion;
