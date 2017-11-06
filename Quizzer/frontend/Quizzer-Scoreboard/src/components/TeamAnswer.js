import React from 'react';
import PropTypes from 'prop-types';

import Panel from 'react-uikit-panel';

import {SCOREBOARD_STATE} from '../constants/scoreboardState';

const TeamAnswer = (props) => {
  let answerStatus;
  if(!props.team.hasAnswered) {
    answerStatus = 'Waiting for answer';
  } else {
    answerStatus = 'Submitted answer';
  }

  switch (props.scoreboardState) {
    case SCOREBOARD_STATE.SHOW_QUESTION:
      return (
        <Panel box col="1-4" margin="top bottom" textAlign="center">
          <span>{props.team.teamName}</span>
          <br/>
          <span>{answerStatus}</span>
        </Panel>
      );
    case SCOREBOARD_STATE.SHOW_ANSWERS:
      return(
        <Panel box col="1-4" margin="top bottom" textAlign="center">
          <span>{props.team.teamName}</span>
          <br/>
          {props.team.givenAnswer && <span>Answered: <b>{props.team.givenAnswer.value}</b></span>} 
        </Panel>
      );
  }
};
TeamAnswer.propTypes = {
  team: PropTypes.object.isRequired,
  scoreboardState: PropTypes.string.isRequired
};

export default TeamAnswer;
