import * as REQUEST_STATE from '../../constants/request';

export default {
  questionWebsocketState: REQUEST_STATE.PENDING,
  questionWebsocketMessage: "Waiting for the quizmaster to approve your team..",
  questionState: false,
  currentQuestion: {
    question: "ertheth",
    category: "ertherth",
    status: REQUEST_STATE.PENDING,
    message: "Waiting for question..",
    hasAnswered: false,
    answer: ""
  },
};
