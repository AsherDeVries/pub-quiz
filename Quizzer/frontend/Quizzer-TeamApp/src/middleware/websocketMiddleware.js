import io from 'socket.io-client';

import { CONNECT_TEAM, TEAM_ALLOWED, SESSION_ACTION_TYPES } from '../constants/actionTypes';
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
              message: "Logging in..."
            }
          });
          socket.emit(CONNECT_TEAM, {
            teamName: action.teamName
          });
        });

        socket.on(TEAM_ALLOWED, () => {
          setLoginState(store);
        });

        socket.on(REQUEST_STATE.PENDING, (data) => {
          setWebsocketState(store, data);
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

function setWebsocketState(store, data) {
  console.log(store, data);
}

export default socketMiddleware;



