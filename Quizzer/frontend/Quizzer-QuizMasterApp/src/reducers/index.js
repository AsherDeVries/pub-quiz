import { combineReducers } from 'redux';

import gameStateReducer from './game/game-state-reducer';
import quiznightReducer from './quiznight/quiznight-reducer';
import questionReducer from './question/question-reducer';

const rootReducer = combineReducers({
  gameStateReducer,
  quiznightReducer,
  questionReducer
});

export default rootReducer;
