import React from 'react';

import Panel from 'react-uikit-panel';
import Grid from 'react-uikit-grid';

const TeamRoundResults = (props) => {
  return (
    <Panel box col='1-3'>
      <span>Round {props.results.round}</span>
      <br/>
      <span>{props.results.questionsCorrect}/12</span>
    </Panel>
  );
}

export default TeamRoundResults;
