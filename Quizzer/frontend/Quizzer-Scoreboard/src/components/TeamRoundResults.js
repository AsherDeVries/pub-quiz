import React from 'react';
import PropTypes from 'prop-types';

import Panel from 'react-uikit-panel';

const TeamRoundResults = (props) => {
  return (
    <Panel box col="1-3">
      <span>Round {props.results.round}</span>
      <br/>
      <span>{props.results.questionsCorrect}/12</span>
    </Panel>
  );
};

TeamRoundResults.propTypes = {
  results: PropTypes.object.isRequired
};

export default TeamRoundResults;
