import axios from 'axios';

import { QUIZNIGHT_ACTION_TYPES, GAME_ACTION_TYPES, QUESTION_ACTION_TYPES } from '../constants/actionTypes';
import * as GAME_STATE from '../constants/gameState';

export function acceptTeam(team, isAccepted) {
  return (dispatch) => {
    if (isAccepted) {
      dispatch({
        type: QUIZNIGHT_ACTION_TYPES.ACCEPT_TEAM,
        team: {
          teamName: team.teamName,
          socketId: team.socketId,
          isAccepted: isAccepted
        }
      });
    }
    else {
      dispatch({
        type: QUIZNIGHT_ACTION_TYPES.DECLINE_TEAM,
        team: team
      });
    }
  };
}

export function startRound(questions) {
  return (dispatch, getState) => {
    const state = getState();
    const { questionSequenceNr, _id } = state.quiznightReducer;

    dispatch({
      type: GAME_ACTION_TYPES.SET_GAME_STATE,
      gameState: GAME_STATE.WAITING_FOR_NEXT_QUESTION
    });

    axios.post(`http://localhost:8080/quiznights/${_id}/rounds`, questions.map(question => {
      return { _id: question._id };
    })).then(() => {
      dispatch({
        type: QUESTION_ACTION_TYPES.FETCH_QUESTIONS,
        questions: questions
      });
      dispatch({
        type: QUIZNIGHT_ACTION_TYPES.ROUND_QUESTION_RECEIVED,
        question: questions[questionSequenceNr],
        questionSequenceNr: questionSequenceNr + 1
      });
      dispatch({
        type: QUIZNIGHT_ACTION_TYPES.SET_AMOUNT_QUESTIONS_PER_ROUND,
        questionsPerRound: questions.length
      });
      dispatch({
        type: GAME_ACTION_TYPES.SET_GAME_STATE,
        gameState: GAME_STATE.CHECKING_ANSWERS
      });
    });
  };
}

export function closeQuestion(question) {
  console.log(question);
}

export function submitAnswerReview(question, correctAnswerTeam) {
  console.log(correctAnswerTeam);
  return (dispatch, getState) => {
    const state = getState();
    const { questionSequenceNr, questionsPerRound } = state.quiznightReducer;
    const questionIsLastQuestionOfRound = (questionSequenceNr === questionsPerRound);

    //tell websocket 

    if (questionIsLastQuestionOfRound) {
      createNewRoundAndEmptyState(dispatch);
    }
    else {
      emptyLastQuestionAndWaitForNextQuestion(dispatch);
    }
  };
}

function createNewRoundAndEmptyState(dispatch) {
  dispatch({
    type: GAME_ACTION_TYPES.SET_GAME_STATE,
    gameState: GAME_STATE.NEW_ROUND_PENDING
  });
  dispatch({
    type: QUIZNIGHT_ACTION_TYPES.EMPTY_STATE,
    currentQuestion: {},
    currentSubmittedAnswers: [],
    questionSequenceNr: 0,
    questionsPerRound: 0
  });
}

function emptyLastQuestionAndWaitForNextQuestion(dispatch) {
  dispatch({
    type: QUIZNIGHT_ACTION_TYPES.EMPTY_CURRENT_QUESTION,
    currentQuestion: {},
    currentSubmittedAnswers: []
  });
  dispatch({
    type: GAME_ACTION_TYPES.SET_GAME_STATE,
    gameState: GAME_STATE.WAITING_FOR_NEXT_QUESTION
  });
}
