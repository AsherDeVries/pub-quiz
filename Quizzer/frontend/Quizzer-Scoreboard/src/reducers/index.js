import { combineReducers } from 'redux';

import sessionReducer from './session/session-reducer';
import scoreboardReducer from './scoreboard/scoreboard-reducer';

const rootReducer = combineReducers({
  sessionReducer,
  scoreboardReducer
});

export default rootReducer;
