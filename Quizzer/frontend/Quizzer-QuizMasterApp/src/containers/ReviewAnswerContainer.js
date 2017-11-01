import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FlatButton from 'material-ui/FlatButton';

class ReviewAnswerContainer extends Component {
  render() {
    return (
      <div>
        <h1>{this.props.currentQuestion.id}</h1>
        
        <FlatButton
          backgroundColor="#f2f2f2"
          label="Close question"
          labelPosition="before"
          primary={true}
        />
        <FlatButton
          backgroundColor="#f2f2f2"
          label="Submit grade"
          labelPosition="before"
          primary={true}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentQuestion: state.quiznightReducer.currentQuestion
  };
}

ReviewAnswerContainer.propTypes = {
  currentQuestion: PropTypes.object
};

export default connect(mapStateToProps)(ReviewAnswerContainer);