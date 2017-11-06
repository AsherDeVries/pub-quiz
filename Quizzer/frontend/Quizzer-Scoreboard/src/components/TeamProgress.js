import React from 'react';
import PropTypes from 'prop-types';

import Panel from 'react-uikit-panel';
import Grid from 'react-uikit-grid';

import TeamRoundResults from './TeamRoundResults';

const TeamProgress = (props) => {
  return (
    <Grid col="1-5" margin="left">
      <Panel box padding="removeBottom" margin="left top">
        <span>{props.team._id}</span>
        <br/>
        <span>RP: {props.team.roundPoints}</span>
        <br/><span>Amount of answers correct: {props.team.score.questionsCorrect}</span><br/>
        <Grid gutter="collapse">
          {/* {array.map(roundResult => <TeamRoundResults key={props.team.name+roundResult.round} results={roundResult}/>)} */}
        </Grid>
      </Panel>
    </Grid>
  );
};

TeamProgress.propTypes = {
  team: PropTypes.object.isRequired
};

export default TeamProgress;
