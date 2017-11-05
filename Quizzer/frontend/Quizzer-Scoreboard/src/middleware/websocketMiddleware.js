import io from 'socket.io-client';

import { CONNECT_SCOREBOARD, NEW_QUESTION, ANSWER_SUBMITTED, SHOW_QUESTION_RESULTS, END_OF_ROUND } from '../constants/actionTypes';


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
        });
        break;
      default:
        return next(action);
    }
  };
})();

export default socketMiddleware;



