import initialState from './initial-scoreboard-state';
import * as types from '../../constants/actionTypes';

export default function scoreboardReducer(state = initialState, action) {
  switch (action.type) {
    case(types.NEW_QUESTION):
      return {
        ...state,
        scoreboardState: action.scoreboardState,
        question: action.question.question,
        category: action.question.category,
        teams: action.teams
      };
    case(types.SHOW_ANSWERS):
      return{
        ...state,
        question: action.question.question,
        category: action.question.category,
        teams: action.teams,
        scoreboardState: action.scoreboardState
      }
    case(types.SHOW_SCORES):
      return{
        ...state,
        scoreboardState: action.scoreboardState,
        teasms: action.teams,
        round: action.roundNumber
      }
    default:
      return state;
  }
}
