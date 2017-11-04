import io from 'socket.io-client';

import {CONNECT_TEAM, NEW_QUESTION, TEAM_ALLOWED, SUBMIT_ANSWER} from '../constants/actionTypes';
import * as REQUEST_STATE from '../constants/request';
import {newQuestion, showScoreOverview, showAnswers, showAnswerSubmission} from '../actions/scoreboardActions';

let socket;

export function joinQuizNight(code) {
  socket = io(`http://localhost:8080/${code}`);
  socket.on('connect', () => {
    socket.emit(CONNECT_SCOREBOARD, {});
  });

  hookUpEvents(socket);
}

function hookUpEvents(socket) {
  endOfRound(socket);
  receiveQuestion(socket);
  showQuestionResults(socket);
  receiveSubmittedAnswer(socket);
}

function receiveSubmittedAnswer(socket) {
  socket.on(ANSWER_SUBMITTED, (data) => {
    showAnswerSubmission(data);
  });
}

function receiveQuestion(socket) {
  socket.on(NEW_QUESTION, (data) => {
    newQuestion(data);
  });
}

function showQuestionResults(socket) {
  socket.on(SHOW_QUESTION_RESULTS, (data) => {
    showAnswers(data);
  });
}

function endOfRound(socket) {
  socket.on(END_OF_ROUND, (data) => {
    showScoreOverview(data);
  });
}
