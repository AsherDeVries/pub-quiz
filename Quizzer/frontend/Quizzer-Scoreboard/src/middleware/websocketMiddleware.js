import io from 'socket.io-client';

import { CONNECT_SCOREBOARD, NEW_QUESTION, ANSWER_SUBMITTED, SHOW_SCORES, SHOW_QUESTION_RESULTS} from '../constants/actionTypes';


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

        socket.on(NEW_QUESTION, data => {
          console.log(data);
        });

        socket.on(ANSWER_SUBMITTED, data => {
          console.log(data);
        });

        socket.on(SHOW_SCORES, data => {
          console.log(data);
        });

        socket.on(SHOW_QUESTION_RESULTS, data => {
          console.log(data);
        });


        break;
      default:
        return next(action);
    }
  };
})();

export default socketMiddleware;



