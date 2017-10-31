import React from 'react';

import Panel from 'react-uikit-panel';
import Grid from 'react-uikit-grid';

import TeamRoundResults from './TeamRoundResults'

const TeamProgress = (props) => {
  let array = [{round: 1, questionsCorrect: 4},{round: 2, questionsCorrect: 8}, {round: 3, questionsCorrect: 9}, {round:4, questionsCorrect: 11}];
  return (
    <Panel box col='1-4' margin='bottom' padding='removeBottom'>
      <span>{props.team.name}</span>
      <br/>
      <span>RP: {props.team.roundPoints}</span>
      <br/><br/>
      <Grid gutter="collapse">
        {array.map(roundResult => <TeamRoundResults key={props.team.name+roundResult.round} results={roundResult}/>)}
      </Grid>
    </Panel>
  );
}

export default TeamProgress;
