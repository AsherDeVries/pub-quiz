import initialState from './initial-scoreboard-state';
import * as types from '../../constants/actionTypes';
import {SCOREBOARD_STATE} from '../../constants/scoreboardState';

export default function scoreboardReducer(state = initialState, action) {
  switch (action.type) {
    case(types.NEW_QUESTION):
      return {
        ...state,
        scoreboardState: action.scoreboardState,
        question: action.question,
        category: action.category,
        teams: action.teams
      };
    case(SCOREBOARD_STATE.SHOW_ANSWERS):
      return{
        ...state,
        teams: action.teams,
        scoreboardState: action.scoreboardState
      };
    case(SCOREBOARD_STATE.SHOW_SCORES):
      return{
        ...state,
        scoreboardState: action.scoreboardState,
        teams: action.teams,
        round: action.roundNumber
      };
    default:
      return state;
  }
}
