import * as REQUEST_STATE from '../constants/request';
import * as GAME_STATE from '../constants/gameState';
import { GAME_ACTION_TYPES, QUIZNIGHT_ACTION_TYPES } from '../constants/actionTypes';

export function startGame() {
  return (dispatch) => {
    dispatch(
      {
        type: GAME_ACTION_TYPES.SET_GAME_START_REQUEST_STATE,
        startGameRequestState: REQUEST_STATE.PENDING
      }
    );

    //Simulate login successful
    setTimeout(() => {
      dispatch(
        {
          type: GAME_ACTION_TYPES.SET_GAME_START_REQUEST_STATE,
          startGameRequestState: REQUEST_STATE.SUCCESS
        }
      );
      dispatch(
        {
          type: GAME_ACTION_TYPES.SET_GAME_STATE,
          gameState: GAME_STATE.WAITING_FOR_APPLICANTS
        }
      );
      dispatch(
        {
          type: QUIZNIGHT_ACTION_TYPES.SET_QUIZNIGHT,
          quiznight: {
            id: '4QzF',
            rounds: [
            ],
            teams: [
            ]
          }
        }
      );
    }, 1000);
  };
}

export function startRound() {
  return (dispatch) => {
    dispatch({
      type: GAME_ACTION_TYPES.SET_GAME_STATE,
      gameState: GAME_STATE.CREATING_NEW_ROUND
    });
  };
}