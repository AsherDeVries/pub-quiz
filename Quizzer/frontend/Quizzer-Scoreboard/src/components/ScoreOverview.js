import React from 'react';

import uikit from 'react-uikit-base';
import Panel from 'react-uikit-panel';
import Grid from 'react-uikit-grid';

import TeamProgress from './TeamProgress'

const ScoreOverview = (props) => {

  return (
  <div>
    <Grid indent margin='bottom'>
      <Panel margin='top left' box>
        <span>Round: {props.state.roundNumber}</span>
        <br/>
        <span>Question: {props.state.questionProgression}/12</span>
      </Panel>
    </Grid>

    <Grid textAlign="center" indent margin='right' gutter='small'>
      {props.state.teams.map(team => <TeamProgress key ={team.teamName} team={team}/>)}
    </Grid>
  </div>
  );
}

uikit.base(ScoreOverview);

export default ScoreOverview;
