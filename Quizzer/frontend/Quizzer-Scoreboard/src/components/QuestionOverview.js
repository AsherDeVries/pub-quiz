import React from 'react';

import uikit from 'react-uikit-base';
import Panel from 'react-uikit-panel';
import Grid from 'react-uikit-grid';

import TeamAnswer from './TeamAnswer';

const QuestionOverview = (props) => {
  return(
    <div>
      <Panel textAlign='center' margin='top'>
        <h1>{props.category}</h1>
        <br/>
        <br/>
        <h3>{props.question}</h3>
      </Panel>
      <Grid textAlign="center" indent margin='right' gutter='small'>
        {props.teams.map(team => <TeamAnswer team={team} questionStatus={props.questionStatus}/>)}
      </Grid>
    </div>
  );
}

export default QuestionOverview;
