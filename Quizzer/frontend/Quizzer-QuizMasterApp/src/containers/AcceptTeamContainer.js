import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Button from 'react-uikit-button';
import Panel from 'react-uikit-panel';
import Grid from 'react-uikit-grid';
import Flex from 'react-uikit-flex';

import initialQuiznightState from '../reducers/quiznight/initial-quiznight-state';
import TeamListComponent from '../components/team/TeamListComponent';
import { acceptTeam } from '../actions/quiznightActions';
import { startRound } from '../actions/gameActions';

class AcceptTeamContainer extends Component {

  handleApprove(team, isAccepted) {
    this.props.acceptTeam(team, isAccepted);
  }

  handleStartRound() {
    this.props.startRound();
  }

  renderStartGameButton() {
    if (this.thereAreAtLeastTwoTeamsAndAllTeamsAreAccepted()) {
      return (
        <Button body="Start first round" context="primary" size="large" onClick={() => this.handleStartRound()}/>
      );
    }
  }

  thereAreAtLeastTwoTeamsAndAllTeamsAreAccepted() {
    const teams = this.props.quiznight.teams;
    return (teams.filter(team => (team.isAccepted)).length === teams.length && teams.length > 1);
  }

  render() {
    const handleApprove = this.handleApprove.bind(this);
    return (
      <div>
        <Panel textAlign="center">
          <h1>Hi quizmaster!</h1>
          <h2>Share this code: {this.props.quiznight.id} </h2>
        </Panel>
        <Grid>
          <TeamListComponent teams={this.props.quiznight.teams} onApproveClick={handleApprove} />
        </Grid>
        <Flex center margin="top">
          {this.renderStartGameButton()}
        </Flex>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    quiznight: state.quiznightReducer
  };
}

AcceptTeamContainer.propTypes = {
  quiznight: PropTypes.object,
  acceptTeam: PropTypes.func,
  startRound: PropTypes.func
};

AcceptTeamContainer.defaultProps = {
  quiznight: initialQuiznightState
};

export default connect(mapStateToProps, { acceptTeam, startRound })(AcceptTeamContainer);
