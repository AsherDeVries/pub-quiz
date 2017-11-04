import axios from 'axios';

import * as GAME_STATE from '../constants/gameState';
import { GAME_ACTION_TYPES, QUIZNIGHT_ACTION_TYPES } from '../constants/actionTypes';
import * as REQUEST_STATE from '../constants/request';

export function startGame() {
  return (dispatch) => {
    dispatch(
      {
        type: GAME_ACTION_TYPES.SET_GAME_START_REQUEST_STATE,
        startGameRequestState: REQUEST_STATE.PENDING
      }
    );
    axios.post(`http://localhost:8080/quiznights`).then((result) => {
      dispatch({
        type: QUIZNIGHT_ACTION_TYPES.CONNECT_QUIZMASTER,
        code: result.data.code
      });

      setTimeout(() => {
        const team = {
          teamName: 'NAME',
          socketId:'someid',
          isAccepted: false
        }

        dispatch({
          type: QUIZNIGHT_ACTION_TYPES.NEW_TEAM,
          team: team
        }); 
      }, 6000)
    });
  };
}

export function createNewRound() {
  return (dispatch) => {
    dispatch({
      type: GAME_ACTION_TYPES.SET_GAME_STATE,
      gameState: GAME_STATE.CREATING_NEW_ROUND
    });
  };
}

export function endGame() {
  return (dispatch) => {
    dispatch({
      type: GAME_ACTION_TYPES.SET_GAME_STATE,
      gameState: GAME_STATE.END
    });

    // to do: disconnect websocket
  };
}
