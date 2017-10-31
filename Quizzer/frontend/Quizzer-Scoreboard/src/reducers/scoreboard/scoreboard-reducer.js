import initialState from './initial-scoreboard-state';

export default function scoreboardReducer(state = initialState, action) {

  return state;
  /*switch (action.type) {
    case(SESSION_ACTION_TYPES.LOGIN_REQUEST_STATE):
      return {...state,
        loginState: action.loginState
      };
    case(SESSION_ACTION_TYPES.LOGIN_STATUS_CHANGE):
      return {...state,
        isLoggedIn: action.isLoggedIn
      };
    default:
      return state;
  }*/
}
