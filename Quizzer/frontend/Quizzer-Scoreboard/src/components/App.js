/* eslint-disable import/no-named-as-default */
import React from 'react';
import PropTypes from 'prop-types';

import Grid from 'react-uikit-grid';
import Panel from 'react-uikit-panel';

import ScoreOverview from './ScoreOverview';
import QuestionOverview from './QuestionOverview';
import {OPEN, CLOSED} from '../constants/messageTypes';

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.

class App extends React.Component {
  constructor() {
    super();
    this.state={
      roundNumber: 1,
      questionProgression: 1,
      category: "Art and Literature",
      question: "Who wrote the Twilight series of novels?",
      questionStatus: CLOSED,
      teams: [
        {
          teamName: "team1",
          roundPoints: 4
        },
        {
          teamName: "team2",
          roundPoints: 0
        },
        {
          teamName: "team3",
          roundPoints: 0
        },
        {
          teamName: "team4",
          roundPoints: 0
        },
        {
          teamName: "team5",
          roundPoints: 0
        }
      ],

    }
  }

  render() {
    return (
      //<ScoreOverview state={this.state}/>
      <QuestionOverview category={this.state.category} question={this.state.question} teams={this.state.teams} questionStatus={this.state.questionStatus}/>
    );
  }
}

App.propTypes = {
  children: PropTypes.element
};

export default App;
