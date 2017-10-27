import * as REQUEST_STATE from '../../constants/request';

export default {
   quizWebsocketState: {
     waitingState: REQUEST_STATE.IDLE
   },
   question: {
     questionState: REQUEST_STATE.IDLE
   }
};
