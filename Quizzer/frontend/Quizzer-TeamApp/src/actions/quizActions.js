import * as types from '../constants/actionTypes';

export function submitAnswer(questionId, answer, reSubmit) {
  return(dispatch, getState) => {
    const sessionReducer = getState().sessionReducer;
    dispatch({
      type: types.SUBMIT_ANSWER,
      question: questionId,
      answer: answer,
      reSubmit: reSubmit,
      teamName: sessionReducer.teamName
    });
  };
}
