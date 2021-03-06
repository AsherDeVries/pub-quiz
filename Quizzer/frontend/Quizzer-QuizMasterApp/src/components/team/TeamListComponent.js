import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Flex from 'react-uikit-flex';

import TeamWidgetComponent from './TeamWidgetComponent';

class TeamListComponent extends Component {
  constructor(props) {
    super(props);
    this.handleApproveClick = this.handleApproveClick.bind(this);
  }

  handleApproveClick(team, isAccepted) {
    this.props.onApproveClick(team, isAccepted);
  }

  render() {
    return (
      <Flex center row="wrap" margin="top" textAlign="center">
        {
          this.props.teams.map(team => (
            <TeamWidgetComponent key={team.name} team={team} onApproveclick={this.handleApproveClick} />
          ))
        }
      </Flex>
    );
  }
}

TeamListComponent.propTypes = {
  onApproveClick: PropTypes.func.isRequired,
  teams: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default TeamListComponent;
