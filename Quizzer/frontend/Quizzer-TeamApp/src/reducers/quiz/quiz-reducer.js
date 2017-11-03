import initialState from './initial-quiz-state';
import * as types from '../../constants/actionTypes';

export default function quizReducer(state = initialState, action) {

  switch (action.type) {
    case(types.ACCEPT_TEAM):
      return {...state,
        questionWebsocketState: action.questionWebsocketState
      };
    case(types.NEW_QUESTION):
      return {...state,
        currentQuestion: action.question,
        questionState: action.questionState,
        questionWebsocketState: action.questionWebsocketState
      };
    case(types.CLOSE_QUESTION):
      return {...state,
        questionState: action.questionState,
        questionWebsocketState: action.questionWebsocketState,
        questionWebsocketMessage: action.questionWebsocketMessage,
        currentQuestion: {
          hasAnswered: false,
          answer: ""
        }
      };
    case(types.SUBMIT_ANSWER):
      return {...state,
        hasAnswered: action.hasAnswered,
        answer: action.answer
      };
    default:
      return state;
  }
}
