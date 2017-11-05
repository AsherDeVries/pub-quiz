import DatabaseCacheHandler from '../../data-stores/database';
import { getQuiznightCodeFromSocket } from '../../utils';
import MESSAGE_TYPES from '../../constants/message_types';
import QuizmasterMessageSender from '../quizmaster/to-quizmaster';
import Quiznight from '../../../models/Quiznight';
import ROOM_NAMES from '../../constants/rooms';
import ScoreboardMessageSender from '../scoreboard/to-scoreboard';
import LocalDataStoreHandler from '../../data-stores/local';

export default (socket, quiznightNamespace) => {
  socket.on(MESSAGE_TYPES.CONNECT_TEAM, (message) => {
    let quiznightCode = getQuiznightCodeFromSocket(socket);

    LocalDataStoreHandler
      .addTeamConnectionToCache(quiznightCode, message.teamName, socket);
    
    LocalDataStoreHandler
      .saveNewTeamInQuiznightToCache(quiznightCode, message.teamName)

    DatabaseCacheHandler
      .saveNewTeamInQuiznightToCache(quiznightCode, message.teamName)
      .then(() => {
        QuizmasterMessageSender
          .toNamespace(quiznightNamespace)
          .usingSocket(socket)
          .sendMessageToQuizmaster(MESSAGE_TYPES.TEAM_JOINED, {
            teamName: message.teamName,
            socketId: socket.id
          });
        socket.join(ROOM_NAMES.TEAMS);
      });
  });

  socket.on(MESSAGE_TYPES.SUBMIT_ANSWER, (message) => {
    let qnCode = getQuiznightCodeFromSocket(socket);
    LocalDataStoreHandler
      .saveAnswerOfTeamInRoundToCache(qnCode, message.round, message.teamName, message.question, message.answer)

    DatabaseCacheHandler
      .saveAnswerOfTeamInRoundToCache(qnCode, message.round, message.teamName, message.question, message.answer)
      .then(() => {
        QuizmasterMessageSender
          .toNamespace(quiznightNamespace)
          .usingSocket(socket)
          .sendMessageToQuizmaster(MESSAGE_TYPES.ANSWER_SUBMITTED, { question: message.question, answer: message.answer });

        ScoreboardMessageSender
          .sendMessageToAllScoreboards(MESSAGE_TYPES.ANSWER_SUBMITTED, { teamName: message.teamName, hasAnswered: true });
      });
  });
}