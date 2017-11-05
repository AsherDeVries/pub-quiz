import * as types from '../constants/actionTypes';
import {SCOREBOARD_STATE} from '../constants/scoreboardState';

export function newQuestion(message) {
  return(dispatch) => {
    dispatch({type: types.NEW_QUESTION, question: message.question, teams: message.teams, scoreboardState: SCOREBOARD_STATE.SHOW_QUESTION});
  };
}

export function showAnswers(message) {
  return(dispatch) => {
    dispatch({
      type: types.SHOW_ANSWERS,
      question: message.question,
      teams: message.teams,
      scoreboardState: SCOREBOARD_STATE.SHOW_ANSWERS
    });
  };
}

export function showScoreOverview(message) {
  return(dispatch) => {
    dispatch({
      type: types.SHOW_SCORES,
      scoreboardState: SCOREBOARD_STATE.SHOW_SCORES,
      teams: message.teams,
      roundNumber: message.round
    });
  };
}

export function showAnswerSubmission(message) {
  return(dispatch) => {
    dispatch({
      type: types.SHOW_ANSWER_SUBMISSION,
      scoreboardState: SCOREBOARD_STATE.SHOW_QUESTION,
      teams: message.teams
    });
  };
}
