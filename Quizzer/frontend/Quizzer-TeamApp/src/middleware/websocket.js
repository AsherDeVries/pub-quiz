import io from 'socket.io-client';

import {CONNECT_TEAM, NEW_QUESTION, TEAM_ALLOWED, SUBMIT_ANSWER} from '../constants/actionTypes';
import * as REQUEST_STATE from '../constants/request';
import {newQuestion, teamAllowed, showMessage } from '../actions/quizActions';

let socket;

export function joinQuizNight(teamName, code) {
  socket = io(`http://localhost:8080/${code}`);
  socket.on('connect', () => {
    socket.emit(CONNECT_TEAM, {
      teamName: teamName
    });
  });

  hookUpEvents(socket);
}

export function sendAnswer(answer) {
  socket.emit(SUBMIT_ANSWER, answer);
}

function hookUpEvents(socket) {
  receiveQuestion(socket);
  receiveMessage(socket);
  teamAccepted(socket);
}

function receiveQuestion(socket) {
  socket.on(NEW_QUESTION, (data) => {
    newQuestion(data);
  });
}

function receiveMessage(socket) {
  socket.on(REQUEST_STATE.PENDING, (data) => {
    showMessage(data);
  });
}

function teamAccepted(socket) {
  socket.on(TEAM_ALLOWED, (data) => {
    teamAllowed(data.isAccepted);
  });
}
