import io from 'socket.io-client';
import { GAME_ACTION_TYPES, QUIZNIGHT_ACTION_TYPES } from '../constants/actionTypes';
import * as REQUEST_STATE from '../constants/request';
import * as GAME_STATE from '../constants/gameState';

const socketMiddleware = (function () {
  let socket = null;

  return store => next => action => {
    switch (action.type) {
      case QUIZNIGHT_ACTION_TYPES.CONNECT_QUIZMASTER:
        if (socket != null) {
          socket.close();
        }

        socket = io(`http://localhost:8080/${action.code}`);
        socket.on('connect', () => {
          socket.emit('CONNECT_QUIZMASTER');
          startGame(store);
          setQuiznight(store, action.code);
          waitForTeams(store);
        });

        socket.on('TEAM_JOINED', (data) => {
          newTeam(store, data);
        });
        break;
      case QUIZNIGHT_ACTION_TYPES.ACCEPT_TEAM:
        socket.emit('ACCEPT_TEAM', action.team);
        acceptTeam(store, action.team);
        break;   
      case QUIZNIGHT_ACTION_TYPES.DECLINE_TEAM:
        socket.emit('ACCEPT_TEAM', action.team);
        declineTeam(store, action.team);
        break;   
      default:
        return next(action);
    }
  };
})();

function startGame(store) {
  store.dispatch({
    type: GAME_ACTION_TYPES.SET_GAME_START_REQUEST_STATE,
    startGameRequestState: REQUEST_STATE.SUCCESS
  });
}

function setQuiznight(store, code) {
  store.dispatch({
    type: QUIZNIGHT_ACTION_TYPES.SET_QUIZNIGHT,
    quiznight: {
      _id: code,
      rounds: [],
      teams: []
    }
  });
}

function waitForTeams(store) {
  store.dispatch({
    type: GAME_ACTION_TYPES.SET_GAME_STATE,
    gameState: GAME_STATE.WAITING_FOR_APPLICANTS
  });
}

function newTeam(store, team) {
  team.isAccepted = false;
  store.dispatch({
    type: QUIZNIGHT_ACTION_TYPES.NEW_TEAM,
    team: team
  });  
}

function acceptTeam(store, team) {
  store.dispatch({
    type: QUIZNIGHT_ACTION_TYPES.WEBSOCKET_ACCEPT_TEAM,
    team: team
  });
}

function declineTeam(store, team) {
  store.dispatch({
    type: QUIZNIGHT_ACTION_TYPES.WEBSOCKET_DECLINE_TEAM,
    team: team
  });
}

export default socketMiddleware;

// code for next question received
// dispatch({
//   type: QUIZNIGHT_ACTION_TYPES.ROUND_QUESTION_RECEIVED,
//   question: availableQuestions[questionSequenceNr],
//   questionSequenceNr: questionSequenceNr + 1
// });
// dispatch({
//   type: GAME_ACTION_TYPES.SET_GAME_STATE,
//   gameState: GAME_STATE.CHECKING_ANSWERS
// });


