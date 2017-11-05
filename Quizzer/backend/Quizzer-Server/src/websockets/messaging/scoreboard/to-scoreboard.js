import MESSAGE_TYPES from '../../constants/message_types';
import ROOM_NAMES from '../../constants/rooms';
import LocalDataStoreRetriever from '../../data-stores/local/retriever';

const ScoreboardMessageSender = {
  toNamespace(namespace) {
    this.namespace = namespace;
    return this;
  },
  usingSocket(socket) {
    this.socket = socket;
    return this;
  },
  sendMessage(messageType, message) {
    this.socket.emit(messageType, message);
  },
  sendMessageToAllScoreboards(messageType, message) {
    this.namespace.to(ROOM_NAMES.SCOREBOARD).emit(messageType, message);
  },
  sendNewQuestionMessage(quiznightCode, question, category) {
    this.sendMessageToAllScoreboards(MESSAGE_TYPES.NEW_QUESTION, {
      question: { question: question, category: category },
      teams: LocalDataStoreRetriever.getTeamsOfQuiznight(quiznightCode)
    });
  }
};

export default ScoreboardMessageSender;