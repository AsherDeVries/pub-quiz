import initialState from './initial-quiz-state';
import * as types from '../../constants/actionTypes';

export default function quizReducer(state = initialState, action) {
  switch (action.type) {
    case(types.NEW_QUESTION):
      return {
        ...state,
        currentQuestion: action.question
      };
    case(types.SET_WEBSOCKET_STATE):
      return {
        ...state,
        questionWebsocketState: action.questionWebsocketState,
        questionWebsocketMessage: action.questionWebsocketMessage
      };
    default:
      return state;
  }
}
