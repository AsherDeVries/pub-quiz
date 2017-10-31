import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import WithLoading from '../components/shared/WithLoading';
import ScoreOverview from '../components/ScoreOverview';
import QuestionOverview from '../components/QuestionOverview';
import {SCOREBOARD_STATE} from '../constants/scoreboardState'

class ScoreboardContainer extends Component {
  renderPageBasedOnScoreboardState(){

    if(this.props.scoreboardState === SCOREBOARD_STATE.SHOW_SCORES) {
      return <ScoreOverview roundNumber = {this.props.roundNumber}
                            questionProgression = {this.props.questionProgression}
                            teams = {this.props.teams}
             />;
    } else {
      return <QuestionOverview category = {this.props.category}
                               question = {this.props.question}
                               teams = {this.props.teams}
                               scoreboardState = {this.props.scoreboardState}
      />
    }
  }

  render() {
    return (
      <div>
        <WithLoading loadingState="">
          {this.renderPageBasedOnScoreboardState()}
        </WithLoading>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    roundNumber: state.scoreboardReducer.roundNumber,
    questionProgression: state.scoreboardReducer.questionProgression,
    teams: state.scoreboardReducer.teams,
    scoreboardState: state.scoreboardReducer.scoreboardState,
    category: state.scoreboardReducer.category,
    question: state.scoreboardReducer.question,

    loadingState: "IDLE",
    loadingMessage: ""

  };
}

export default connect(mapStateToProps)(ScoreboardContainer);
