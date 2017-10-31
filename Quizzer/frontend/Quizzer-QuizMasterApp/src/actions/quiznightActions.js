import { QUIZNIGHT_ACTION_TYPES } from '../constants/actionTypes';

export function acceptTeam(team, isAccepted) {
  return (dispatch) => {
    if(isAccepted) {
      dispatch ({
        type: QUIZNIGHT_ACTION_TYPES.ACCEPT_TEAM,
        team: {
          name: team,
          isAccepted
        }
      });
    }
    else {
      dispatch({
        type: QUIZNIGHT_ACTION_TYPES.DECLINE_TEAM,
        teamName: team
      });
    } 
  };
}
