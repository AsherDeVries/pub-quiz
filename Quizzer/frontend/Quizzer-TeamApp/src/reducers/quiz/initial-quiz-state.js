import * as REQUEST_STATE from '../../constants/request';

export default {
  questionWebsocketState: REQUEST_STATE.PENDING,
  questionWebsocketMessage: "Waiting for the quizmaster to approve your team..",
  questionState: false,
  currentQuestion: {
    question: "",
    category: "",
    status: REQUEST_STATE.PENDING,
    message: "",
    hasAnswered: false,
    answer: ""
  },
};
