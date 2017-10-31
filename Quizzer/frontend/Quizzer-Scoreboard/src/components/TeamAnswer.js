import React from 'react';

import Panel from 'react-uikit-panel';
import Grid from 'react-uikit-grid';
import {QUESTION_OPEN, SHOW_ANSWER} from '../constants/messageTypes';


const TeamAnswer = (props) => {
  let hasAnswered = false;
  let answerStatus;
  let answer = 'Stephenie Meyer';
  let QUESTION_STATUS = props.questionStatus;

  switch(QUESTION_STATUS) {
    case QUESTION_OPEN:
      if (hasAnswered) {
        answerStatus = 'Submitted an answer'
      } else {
        answerStatus = 'Waiting for answer';
      }

      return (
        <Panel box col='1-4' margin='top bottom' textAlign='center'>
          <span>{props.team.name}</span>
          <br/>
          <span>{answerStatus}</span>
        </Panel>
      );
      break;
    case SHOW_ANSWER:
      return(
        <Panel box col='1-4' margin='top bottom' textAlign='center'>
          <span>{props.team.name}</span>
          <br/>
          <span>{answer}</span>
        </Panel>
      );
  }
}

export default TeamAnswer;
