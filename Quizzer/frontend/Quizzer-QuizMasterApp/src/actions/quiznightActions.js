import { QUIZNIGHT_ACTION_TYPES, GAME_ACTION_TYPES } from '../constants/actionTypes';
import * as GAME_STATE from '../constants/gameState';

export function acceptTeam(team, isAccepted) {
  return (dispatch) => {
    if (isAccepted) {
      dispatch({
        type: QUIZNIGHT_ACTION_TYPES.ACCEPT_TEAM,
        team: {
          name: team,
          isAccepted
        }
      });
    }
    else {
      dispatch({
        type: QUIZNIGHT_ACTION_TYPES.DECLINE_TEAM,
        teamName: team
      });
    }
  };
}

export function startRound(questions) {
  return (dispatch, getState) => {
    const questionSequenceNr = getState().quiznightReducer.questionSequenceNr;

    dispatch({
      type: GAME_ACTION_TYPES.SET_GAME_STATE,
      gameState: GAME_STATE.WAITING_FOR_NEXT_QUESTION
    });

    setTimeout(() => {
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

      simulateAnswerReviewed(dispatch);
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

    if (questionIsLastQuestionOfRound) {
      createNewRoundAndEmptyState(dispatch);
    }
    else {
      emptyLastQuestionAndWaitForNextQuestion(dispatch);

      //simulate new question from websocket, remove this code when websockets are implemented
      const { availableQuestions } = state.questionReducer;
      setTimeout(() => {
        dispatch({
          type: QUIZNIGHT_ACTION_TYPES.ROUND_QUESTION_RECEIVED,
          question: availableQuestions[questionSequenceNr],
          questionSequenceNr: questionSequenceNr + 1
        });
        dispatch({
          type: GAME_ACTION_TYPES.SET_GAME_STATE,
          gameState: GAME_STATE.CHECKING_ANSWERS
        });
        simulateAnswerReviewed(dispatch);
      }, 2000);
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

// remove this function when websockets are implemented
function simulateAnswerReviewed(dispatch) {
  setTimeout(() => {
    dispatch(
      {
        type: QUIZNIGHT_ACTION_TYPES.ANSWER_RECEIVED,
        answer: { team: 'Team 1', text: 'Nelson Mandela' }
      }
    );
    setTimeout(() => {
      dispatch(
        {
          type: QUIZNIGHT_ACTION_TYPES.ANSWER_RECEIVED,
          answer: { team: 'Team 2', text: 'William Nelson' }
        }
      );
    }, 1000);
  }, 2000);
}
