import axios from 'axios';

import { CATEGORY_ACTION_TYPES, QUESTION_ACTION_TYPES } from '../constants/actionTypes';

export function fetchCategories() {
  return (dispatch) => {
    axios.get('http://localhost:8080/categories').then(result => {
      dispatch({
        type: CATEGORY_ACTION_TYPES.FETCH_CATEGORIES,
        categories: result.data
      });
    });
  };
}

export function fetchQuestions(categories) {
  return (dispatch) => {
    const questionPromises = categories.map(category => {
      return axios.get(`http://localhost:8080/questions?category=${category._id}&random=true&limit=8`);
    });

    Promise.all(questionPromises).then(data => {
      let result = [];
      data.forEach(questions => {
        result.push(...questions.data);
      });

      dispatch({
        type: QUESTION_ACTION_TYPES.FETCH_QUESTIONS,
        questions: result
      });
    });
  };
}