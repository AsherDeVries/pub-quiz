import initialState from './initial-quiznight-state';
import { QUIZNIGHT_ACTION_TYPES } from '../../constants/actionTypes';

export default function quiznightReducer(state = initialState, action) {
  switch (action.type) {
    case QUIZNIGHT_ACTION_TYPES.SET_QUIZNIGHT:
      return {
        ...state,
        id: action.quiznight.id
      };
    case QUIZNIGHT_ACTION_TYPES.DECLINE_TEAM:
     return {
       ...state,
       teams: state.teams.filter(team => (team.name !== action.teamName))
     };
    case QUIZNIGHT_ACTION_TYPES.ACCEPT_TEAM:
      return {
        ...state,
        teams: state.teams.map(team => {
          if  (team.name == action.team.name) {
            return action.team;
          }
          return team;
        })
      };
    case QUIZNIGHT_ACTION_TYPES.ROUND_QUESTION_RECEIVED:
      return {
        ...state,
        currentQuestion: action.question
      };
    default:
      return state;
  }
}
