import initialState from './initial-question-state';
import SUBMIT_ANSWER from '../../constants/actionTypes'

export default function questionReducer(state = initialState, action) {

  switch (action.type) {
    case(SUBMIT_ANSWER):
      return {...state,
        answer: action.answer
      }
    default:
      return state;
  }
}
