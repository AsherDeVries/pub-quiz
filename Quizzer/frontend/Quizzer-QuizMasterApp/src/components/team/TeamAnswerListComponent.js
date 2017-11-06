import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Flex from 'react-uikit-flex';


import TeamAnswerWidgetComponent from './TeamAnswerWidgetComponent';

class TeamAnswerListComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Flex center row="wrap" margin="top" textAlign="center">
        {
          this.props.answers && this.props.answers.map(answer => (
            <TeamAnswerWidgetComponent
              key={answer.teamName}
              answer={answer}
              onApproveClick={this.props.handleApproveClick}
              closed={this.props.closed}
            />
          ))
        }
      </Flex>
    );
  }
}

TeamAnswerListComponent.propTypes = {
  answers: PropTypes.arrayOf(PropTypes.object),
  handleApproveClick: PropTypes.func.isRequired,
  closed: PropTypes.bool
};

export default TeamAnswerListComponent;
