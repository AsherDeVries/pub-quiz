import * as REQUEST_STATE from '../constants/request';
import * as types from '../constants/actionTypes';
import {sendAnswer} from '../middleware/websocket';

export function teamAllowed(isAllowed) {
  return(dispatch) => {
    dispatch({type: types.TEAM_ALLOWED, questionWebsocketState: REQUEST_STATE.SUCCESS, isAllowed: isAllowed, questionState: isAllowed});
  };
}

export function newQuestion(question) {
  return(dispatch) => {
    dispatch({type: types.NEW_QUESTION, question: question, questionWebsocketState: REQUEST_STATE.SUCCESS});
  };
}

export function showMessage(msg) {
  return(dispatch) => {
    dispatch({type: types.SHOW_MESSAGE, questionWebsocketState: REQUEST_STATE.PENDING, questionWebsocketMessage: msg});
  };
}

export function submitAnswer(answer) {
  return(dispatch) => {
    sendAnswer(answer);
    dispatch({
      type: types.SUBMIT_ANSWER,
      currentQuestion: {
        hasAnswered: true,
        answer
      }
    });
  };
}
