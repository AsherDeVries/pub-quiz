import React from 'react';
import PropTypes from 'prop-types';

import Panel from 'react-uikit-panel';
import Flex from 'react-uikit-flex';
import Button from 'react-uikit-button';
import TextField from 'material-ui/TextField';

class AnswerQuestion extends React.Component {
  constructor(props) {
    super(props);

    this.state={
      answer: "",
      hasAnswered: false,
      lastAnswerSubmitted: ""
    };
  }

  handleAnswerChange(answer) {
    this.setState({
      answer
    });
  }

  handleAnswerSubmit() {
    if(this.state.answer !== "") {
      this.props.submitAnswer(this.state.answer);
      this.setState({
        hasAnswered: true,
        lastAnswerSubmitted: this.state.answer
      });
    }
  }

  renderSubmitButtonBasedOnAnsweringStatus() {
      return <Button body={(!this.state.hasAnswered) ? "Submit" : "Resubmit"} context="primary" size="large" onClick={() => this.handleAnswerSubmit()}/>;
  }

  render() {
    return(
      <div>
        <Panel textAlign="center" margin="top">
          <h1>{this.props.category}</h1>
          <br/>
          <br/>
          <h3>{this.props.question}</h3>
          <br/>
          <br/>
        </Panel>
        <Flex center margin="top" direction="column">
          <Panel center margin="top bottom">
            <h4>Last answer submitted: {this.state.lastAnswerSubmitted}</h4>
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


AnswerQuestion.propTypes = {
  submitAnswer: PropTypes.func,
  category: PropTypes.string,
  question: PropTypes.string
};

export default AnswerQuestion;
