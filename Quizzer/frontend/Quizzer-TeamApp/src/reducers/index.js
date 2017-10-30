import { combineReducers } from 'redux';

import quizReducer from './quiz/quiz-reducer';
import sessionReducer from './session/session-reducer';

const rootReducer = combineReducers({
  quizReducer,
  sessionReducer
});

export default rootReducer;
