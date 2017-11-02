import initialState from './initial-game-state';
import { GAME_ACTION_TYPES } from '../../constants/actionTypes';

export default function gameStateReducer(state = initialState, action) {
  switch (action.type) {
    case GAME_ACTION_TYPES.SET_GAME_STATE:
      return {...state,
        gameState: action.gameState
    };
    case GAME_ACTION_TYPES.SET_GAME_START_REQUEST_STATE:
      return {...state,
        startGameRequestState: action.startGameRequestState
      };
    default:
      return state;
  }
}
