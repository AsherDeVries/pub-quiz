import React from 'react';

import Panel from 'react-uikit-panel';
import Grid from 'react-uikit-grid';
import Icons from 'react-uikit-icons';
import Flex from 'react-uikit-flex';


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

    <Flex center row="wrap" textAlign="center">
      {props.teams.map(team => <TeamProgress key ={team.name} team={team}/>)}
    </Flex>
  </div>
  );
}
export default ScoreOverview;
