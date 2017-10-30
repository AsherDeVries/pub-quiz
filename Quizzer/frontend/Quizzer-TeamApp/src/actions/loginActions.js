import * as REQUEST_STATE from '../constants/request';
import { SESSION_ACTION_TYPES } from '../constants/actionTypes';

export function login(teamName) {
  return (dispatch) => {
    dispatch(
      {
        type: SESSION_ACTION_TYPES.LOGIN_REQUEST_STATE,
        loginState: {
          requestStatus: REQUEST_STATE.PENDING,
          message: ""
        }
      }
    );

    dispatch(
      {
        type: SESSION_ACTION_TYPES.SET_TEAM_NAME,
        teamName
      }
    );

    //Simulate login successful
    setTimeout(() => {
      dispatch(
        {
          type: SESSION_ACTION_TYPES.LOGIN_REQUEST_STATE,
          loginState: {
            requestStatus: REQUEST_STATE.SUCCESS,
            message: ""
          }
        }
      );
      dispatch(
        {
          type: SESSION_ACTION_TYPES.LOGIN_STATUS_CHANGE,
          isLoggedIn: true
        }
      );
    }, 1000);
  };
}