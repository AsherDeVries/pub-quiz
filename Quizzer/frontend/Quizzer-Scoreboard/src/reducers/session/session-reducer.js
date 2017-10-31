import initialState from './initial-session-state';
import { SESSION_ACTION_TYPES } from '../../constants/actionTypes';

export default function sessionReducer(state = initialState, action) {
  switch (action.type) {
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
  }
}
