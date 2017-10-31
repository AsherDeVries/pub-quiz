import React from 'react';

import Panel from 'react-uikit-panel';
import Grid from 'react-uikit-grid';
import {SCOREBOARD_STATE} from '../constants/scoreboardState'

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
        <Panel box col='1-4' margin='top bottom' textAlign='center'>
          <span>{props.team.name}</span>
          <br/>
          <span>{answerStatus}</span>
        </Panel>
      );
    case SCOREBOARD_STATE.SHOW_ANSWERS:
      return(
        <Panel box col='1-4' margin='top bottom' textAlign='center'>
          <span>{props.team.name}</span>
          <br/>
          <span>{props.team.answer}</span>
        </Panel>
      );
  }
}

export default TeamAnswer;
