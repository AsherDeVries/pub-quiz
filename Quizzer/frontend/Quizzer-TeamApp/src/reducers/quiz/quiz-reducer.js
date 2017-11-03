import initialState from './initial-quiz-state';
import * as types from '../../constants/actionTypes';

export default function quizReducer(state = initialState, action) {

  switch (action.type) {
    case(types.TEAM_ALLOWED):
      return {
        ...state,
        questionWebsocketState: action.questionWebsocketState,
        isAllowed: action.isAllowed,
        questionState: action.questionState
      };
    case(types.NEW_QUESTION):
      return {
        ...state,
        currentQuestion: action.question,
        questionState: action.questionState,
        questionWebsocketState: action.questionWebsocketState
      };
    case(types.SHOW_MESSAGE):
      return {
        ...state,
        questionState: action.questionState,
        questionWebsocketState: action.questionWebsocketState,
        questionWebsocketMessage: action.questionWebsocketMessage,
        currentQuestion: {
          hasAnswered: false,
          answer: ""
        }
      };
    case(types.SUBMIT_ANSWER):
      return {
        ...state,
        hasAnswered: action.hasAnswered,
        answer: action.answer
      };
    default:
      return state;
  }
}
