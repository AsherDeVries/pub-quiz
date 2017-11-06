import initialState from './initial-question-state';
import { CATEGORY_ACTION_TYPES, QUESTION_ACTION_TYPES } from '../../constants/actionTypes';

export default function questionReducer(state = initialState, action) {
  switch (action.type) {
    case CATEGORY_ACTION_TYPES.FETCH_CATEGORIES:
      return {
        ...state,
        availableCategories: action.categories
      };
    case QUESTION_ACTION_TYPES.FETCH_QUESTIONS:
      return {
        ...state,
        availableQuestions: action.questions
      };
    default:
      return state;
  }
}
