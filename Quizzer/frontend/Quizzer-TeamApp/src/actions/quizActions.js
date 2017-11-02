import * as types from '../constants/actionTypes';

// example of a thunk using the redux-thunk middleware
export function fetchQuestions() {
  return function (dispatch) {
    // thunks allow for pre-processing actions, calling apis, and dispatching multiple actions
    // in this case at this point we could call a service that would persist the fuel savings
    return dispatch({
      type: types.FETCH_QUESTIONS,
      questions: {Q: 'q', A: 'a'}
    });
  };
}

export function submitAnswer(answer) {
  return function (dispatch) {
    return dispatch({
      type: types.SUBMIT_ANSWER,
      hasAnswered: true,
      answer
    });
  }
}
