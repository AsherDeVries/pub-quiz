import React from 'react';
import PropTypes from 'prop-types';

import Panel from 'react-uikit-panel';
import Grid from 'react-uikit-grid';
import Flex from 'react-uikit-flex';

import TeamProgress from './TeamProgress';

 const ScoreOverview = (props) => {

  return (
  <div>
    <Grid indent margin="bottom">
      <Panel margin="top left" padding="left right" box>
        <span>Round: {props.teams[0].score.round}</span>
        <br/>
        <br/>
      </Panel>
    </Grid>

    <Flex center row="wrap" textAlign="center">
      {props.teams && props.teams.map(team => <TeamProgress key ={team._id} team={team}/>)}
    </Flex>
  </div>
  );
};
ScoreOverview.propTypes = {
  teams: PropTypes.array
};

export default ScoreOverview;
