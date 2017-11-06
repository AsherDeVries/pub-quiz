import {SESSION_ACTION_TYPES, CONNECT_TEAM} from '../constants/actionTypes';

export function login(teamName, password) {
  return(dispatch) => {
    dispatch({
      type: SESSION_ACTION_TYPES.SET_TEAM_NAME, teamName
    });

    dispatch({
      type: CONNECT_TEAM,
      teamName: teamName,
      code: password
    });
  };
}
