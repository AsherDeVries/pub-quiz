import io from 'socket.io-client';

import { LOGIN_STATUS_CHANGE, LOGIN_REQUEST_STATE, CONNECT_SCOREBOARD, NEW_QUESTION, ANSWER_SUBMITTED, SHOW_SCORES, SHOW_QUESTION_RESULTS} from '../constants/actionTypes';
import { SCOREBOARD_STATE } from '../constants/scoreboardState';


const socketMiddleware = (function () {
  let socket = null;

  return store => next => action => {
    switch (action.type) {
      case CONNECT_SCOREBOARD:
        if (socket != null) {
          socket.close();
        }

        socket = io(`http://localhost:8080/${action.code}`);
        socket.on('connect', () => {
          socket.emit(CONNECT_SCOREBOARD, {});
          store.dispatch({
            type: LOGIN_REQUEST_STATE,
            loginState: 'SUCCESS'
          });
          store.dispatch({
            type: LOGIN_STATUS_CHANGE,
            isLoggedIn: true
          });
        });

        socket.on(NEW_QUESTION, data => {
          console.log(NEW_QUESTION, data)
          showQuestion(store, data);
        });

        socket.on(ANSWER_SUBMITTED, data => {
          console.log(ANSWER_SUBMITTED , data);
        });

        socket.on(SHOW_SCORES, data => {
          console.log(SHOW_SCORE, data);
        });

        socket.on(SHOW_QUESTION_RESULTS, data => {
          console.log(SHOW_QUESTION_RESULTS, data);
        });


        break;
      default:
        return next(action);
    }
  };
})();

function showQuestion(store, data) {
  store.dispatch({
    type: NEW_QUESTION,
    scoreboardState: SCOREBOARD_STATE.SHOW_QUESTION,
    question: data.question.question,
    category: data.question.category,
    teams: data.teams
  })
}

function showAnswers(store, data) {
  store.dispatch({
    type: SHOW_ANSWERS,
    question: data.question.question,
    category: data.question.category,
    teams: data.teams,
    scoreboardState: SCOREBOARD_STATE.SHOW_ANSWERS
  });
}

export default socketMiddleware;



