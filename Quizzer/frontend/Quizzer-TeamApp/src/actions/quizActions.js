import * as REQUEST_STATE from '../constants/request';
import * as types from '../constants/actionTypes';

export function newQuestion(question) {
  return function (dispatch) {
    return dispatch({
      type: types.NEW_QUESTION,
      question: question,
      questionState: true,
      questionWebsocketState: REQUEST_STATE.SUCCESS,
    });
  };
}

export function closeQuestion() {
  return function (dispatch) {
    return dispatch({
      type: types.CLOSE_QUESTION,
      questionState: false,
      questionWebsocketState: REQUEST_STATE.PENDING,
      questionWebsocketMessage: "Waiting for next question.."
    });
  };
}

export function acceptTeam() {
  return function (dispatch) {
    return dispatch({
      type: types.ACCEPT_TEAM,
      questionWebsocketState: REQUEST_STATE.SUCCESS
    });
  };
}

export function submitAnswer(answer) {
  return function (dispatch) {
    return dispatch({
      type: types.SUBMIT_ANSWER,
      currentQuestion: {
        hasAnswered: true,
        answer
      }
    });
  };
}
