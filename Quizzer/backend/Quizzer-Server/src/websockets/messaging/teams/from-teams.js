import DatabaseCacheHandler from '../../data-stores/database';
import { getQuiznightCodeFromSocket } from '../../utils';
import MESSAGE_TYPES from '../../constants/message_types';
import QuizmasterMessageSender from '../quizmaster/to-quizmaster';
import Quiznight from '../../../models/Quiznight';
import ROOM_NAMES from '../../constants/rooms';
import ScoreboardMessageSender from '../scoreboard/to-scoreboard';
import TeamMessageSender from '../teams/to-teams';
import LocalDataStoreHandler from '../../data-stores/local';
import LocalDataStoreRetriever from '../../data-stores/local/retriever';

export default (socket, quiznightNamespace) => {
  socket.on(MESSAGE_TYPES.CONNECT_TEAM, (message) => {
    let quiznightCode = getQuiznightCodeFromSocket(socket);

    let currentAmountOfConnections = LocalDataStoreRetriever.getTeamsOfQuiznight(quiznightCode);
    const MAX_ALLOWED_CONNECTIONS = 6;
    if(currentAmountOfConnections.length < MAX_ALLOWED_CONNECTIONS) {
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

          TeamMessageSender
            .toNamespace(quiznightNamespace)
            .usingSocket(socket)
            .sendMessageToSocketViaId(socket.id, MESSAGE_TYPES.PENDING, 'Welcome to the quiznight!, waiting for approval of quizmaster..');

          socket.join(ROOM_NAMES.TEAMS);
        });
    } else {
      TeamMessageSender
        .toNamespace(quiznightNamespace)
        .usingSocket(socket)
        .sendMessageToSocketViaId(socket.id, MESSAGE_TYPES.PENDING, 'Sorry, quiznight is full.');
    }
  });

  socket.on(MESSAGE_TYPES.SUBMIT_ANSWER, (message) => {
    let qnCode = getQuiznightCodeFromSocket(socket);
    LocalDataStoreHandler
      .saveAnswerOfTeamInRoundToCache(qnCode, message.round, message.teamName, message.question, message.answer);

    let round = LocalDataStoreRetriever.getCurrentRoundInQuiznight(qnCode);

    DatabaseCacheHandler
      .saveAnswerOfTeamInRoundToCache(qnCode, round, message.teamName, message.question, message.answer)
      .then(() => {
        QuizmasterMessageSender
          .toNamespace(quiznightNamespace)
          .usingSocket(socket)
          .sendMessageToQuizmaster(MESSAGE_TYPES.ANSWER_RECEIVED, { teamName: message.teamName, answer: message.answer, reSubmit: message.reSubmit });

        ScoreboardMessageSender
          .sendMessageToAllScoreboards(MESSAGE_TYPES.ANSWER_SUBMITTED, { teamName: message.teamName, hasAnswered: true });
      });
  });
}