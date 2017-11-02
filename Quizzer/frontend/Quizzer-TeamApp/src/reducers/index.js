import { combineReducers } from 'redux';

import quizReducer from './quiz/quiz-reducer';
import sessionReducer from './session/session-reducer';
import questionReducer from './question/question-reducer';

const rootReducer = combineReducers({
  quizReducer,
  sessionReducer,
  questionReducer
});

export default rootReducer;
