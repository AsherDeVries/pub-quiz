import { QUIZNIGHT_ACTION_TYPES } from '../constants/actionTypes';
import { GAME_ACTION_TYPES } from '../constants/actionTypes';
import * as GAME_STATE from '../constants/gameState';

export function acceptTeam(team, isAccepted) {
  return (dispatch) => {
    if(isAccepted) {
      dispatch ({
        type: QUIZNIGHT_ACTION_TYPES.ACCEPT_TEAM,
        team: {
          name: team,
          isAccepted
        }
      });
    }
    else {
      dispatch({
        type: QUIZNIGHT_ACTION_TYPES.DECLINE_TEAM,
        teamName: team
      });
    } 
  };
}

export function startRound(questions) {
  return (dispatch) => {
    dispatch({
      type: GAME_ACTION_TYPES.SET_GAME_STATE,
      gameState: GAME_STATE.CHECKING_ANSWERS
    });
    dispatch({
      type: QUIZNIGHT_ACTION_TYPES.ROUND_QUESTION_RECEIVED,
      question: questions[1]
    });

    // simulate answer received
  }
}

export function closeQuestion(question) {
  console.log(question);
}

export function submitAnswerReview(question, correctAnswerTeam) {
    //vraag,
    //array: team+antwoord+correct
    console.log(question, correctAnswerTeam);
}
