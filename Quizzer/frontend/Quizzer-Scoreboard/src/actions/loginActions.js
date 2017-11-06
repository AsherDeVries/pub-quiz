import * as actionTypes from '../constants/actionTypes';

export function login(password) {
  return (dispatch) => {
    dispatch(
      {
        type: actionTypes.CONNECT_SCOREBOARD,
        code: password
      }
    );
  };
}
