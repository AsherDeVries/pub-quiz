import React from 'react';

import Panel from 'react-uikit-panel';
import Grid from 'react-uikit-grid';
import Icons from 'react-uikit-icons';

import TeamProgress from './TeamProgress'

 const ScoreOverview = (props) => {

  return (
  <div>
    <Grid indent margin='bottom'>
      <Panel margin='top left' padding='left right' box>
        <span>Round: {props.roundNumber}</span>
        <br/>
        <span>Question: {props.questionProgression}/12</span>
        <br/>
      </Panel>
    </Grid>

    <Grid textAlign="center" indent margin='right' gutter='small'>
      {props.teams.map(team => <TeamProgress key ={team.name} team={team}/>)}
    </Grid>
  </div>
  );
}
export default ScoreOverview;
