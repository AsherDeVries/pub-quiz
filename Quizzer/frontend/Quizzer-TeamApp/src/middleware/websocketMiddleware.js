import io from 'socket.io-client';

import { CONNECT_TEAM, SUBMIT_ANSWER, TEAM_ALLOWED, NEW_QUESTION, SET_WEBSOCKET_STATE, SESSION_ACTION_TYPES } from '../constants/actionTypes';
import * as REQUEST_STATE from '../constants/request';

const socketMiddleware = (function () {
  let socket = null;

  return store => next => action => {
    switch (action.type) {
      case CONNECT_TEAM:
        if (socket != null) {
          socket.close();
        }

        socket = io(`http://localhost:8080/${action.code}`);
        socket.on('connect', () => {
          store.dispatch({
            type: SESSION_ACTION_TYPES.LOGIN_REQUEST_STATE,
            loginState: {
              requestStatus: REQUEST_STATE.PENDING,
              message: "Waiting for the quizmaster to approve your team..."
            }
          });
          socket.emit(CONNECT_TEAM, {
            teamName: action.teamName
          });
        });

        socket.on(TEAM_ALLOWED, () => {
          setLoginState(store);
          setWebsocketState(store, REQUEST_STATE.PENDING, 'Team accepted, waiting for others to join..');
        });

        socket.on(REQUEST_STATE.PENDING, message => {
          setWebsocketState(store, REQUEST_STATE.PENDING, message);
        });

        socket.on(NEW_QUESTION, data => {
          setCurrentQuestion(store, data.question);
          setWebsocketState(store, REQUEST_STATE.IDLE);
        });
        break;
      case SUBMIT_ANSWER:
        socket.emit(SUBMIT_ANSWER, {
          teamName: action.teamName,
          question: action.question,
          answer: action.answer,
          reSubmit: action.reSubmit
        });
        break;
      default:
        return next(action);
    }
  };
})();

function setLoginState(store) {
  store.dispatch({
    type: SESSION_ACTION_TYPES.LOGIN_REQUEST_STATE,
    loginState: {
      requestStatus: REQUEST_STATE.SUCCESS,
      message: ""
    }
  });
  store.dispatch({ type: SESSION_ACTION_TYPES.LOGIN_STATUS_CHANGE, isLoggedIn: true });
}

function setWebsocketState(store, requestState, message) {
  store.dispatch({
    type: SET_WEBSOCKET_STATE,
    questionWebsocketState: requestState,
    questionWebsocketMessage: (message) ? message : ""
  });
}

function setCurrentQuestion(store, question) {
  store.dispatch({
    type: NEW_QUESTION,
    question: question
  });
}

export default socketMiddleware;



