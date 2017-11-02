import React from 'react';

import Panel from 'react-uikit-panel';
import Grid from 'react-uikit-grid';
import PropTypes from 'prop-types';

import TeamAnswer from './TeamAnswer';

const QuestionOverview = (props) => {
  return(
    <div>
      <Panel textAlign="center" margin="top">
        <h1>{props.category}</h1>
        <br/>
        <br/>
        <h3>{props.question}</h3>
      </Panel>
      <Grid textAlign="center" indent margin="right" gutter="small">
        {props.teams.map(team => <TeamAnswer key={team.name} team={team} scoreboardState={props.scoreboardState}/>)}
      </Grid>
    </div>
  );
};

QuestionOverview.propTypes = {
  category: PropTypes.string.isRequired,
  question: PropTypes.string.isRequired,
  teams: PropTypes.array,
  scoreboardState: PropTypes.string.isRequired
};

export default QuestionOverview;
