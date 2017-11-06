import * as REQUEST_STATE from '../../constants/request';

export default {
  questionWebsocketState: REQUEST_STATE.PENDING,
  questionWebsocketMessage: "Waiting for the quizmaster to approve your team..",
  currentQuestion: {
    question: {
      _id: "",
      category: ""
    }
  }
};
