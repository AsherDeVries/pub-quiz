import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TeamAnswerWidgetComponent from './TeamAnswerWidgetComponent';

class TeamAnswerListComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {
          this.props.answers && this.props.answers.map(answer => (
            <TeamAnswerWidgetComponent
              key={answer.team}
              answer={answer}
              onApproveClick={this.props.handleApproveClick}
              closed={this.props.closed}
            />
          ))
        }
      </div>
    );
  }
}

TeamAnswerListComponent.propTypes = {
  answers: PropTypes.arrayOf(PropTypes.object),
  handleApproveClick: PropTypes.func.isRequired,
  closed: PropTypes.bool
};

export default TeamAnswerListComponent;