import initialState from './initial-session-state';
import { LOGIN_REQUEST_STATE, LOGIN_STATUS_CHANGE  } from '../../constants/actionTypes';

export default function sessionReducer(state = initialState, action) {
  switch (action.type) {
    case(LOGIN_REQUEST_STATE):
      return {...state,
        loginState: action.loginState
      };
    case(LOGIN_STATUS_CHANGE):
      return {...state,
        isLoggedIn: action.isLoggedIn
      };
    default:
      return state;
  }
}
