import { combineReducers } from 'redux';

import gameStateReducer from './game/game-state-reducer';
import quiznightReducer from './quiznight/quiznight-reducer';

const rootReducer = combineReducers({
  gameStateReducer,
  quiznightReducer
});

export default rootReducer;
