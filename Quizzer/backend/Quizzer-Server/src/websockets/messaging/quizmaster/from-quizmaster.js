import DatabaseCacheHandler from '../../caching/database';
import { getQuiznightCodeFromSocket } from '../../utils';
import MESSAGE_TYPES from '../../constants/message_types';
import QuizmasterMessageSender from '../quizmaster/to-quizmaster';
import Quiznight from '../../../models/Quiznight';
import ROOM_NAMES from '../../constants/rooms';
import TeamMessageSender from '../teams/to-teams';
import TeamWebsocketConnectionsCacheHandler from '../../caching/connections';

export default (socket, quiznightNamespace) => {

  socket.on(MESSAGE_TYPES.CONNECT_QUIZMASTER, (message) => {
    socket.join(ROOM_NAMES.QUIZMASTER);

    QuizmasterMessageSender
      .toNamespace(quiznightNamespace)
      .usingSocket(socket)
      .sendMessage(MESSAGE_TYPES.PENDING, 'Welcome to the quiznight quizmaster!, waiting for teams to apply..')
  });

  socket.on(MESSAGE_TYPES.ACCEPT_TEAM, (message) => {
    let messageToTeam = { accepted: message.team.isAccepted };

    TeamMessageSender
      .toNamespace(quiznightNamespace)
      .usingSocket(socket)
      .sendMessageToSocketViaId(message.team.socketId, MESSAGE_TYPES.TEAM_ALLOWED, messageToTeam);

    if(!messageToTeam.isAccepted) {
      let qnCode = getQuiznightCodeFromSocket(socket);
      DatabaseCacheHandler
        .removeTeamInQuiznightFromCache(qnCode, message.team.teamName)
      .then(TeamMessageSender.disconnectSocket(message.team.socketId));
    }
  });

  socket.on(MESSAGE_TYPES.START_ROUND, (message) => {
    let qnCode = getQuiznightCodeFromSocket(socket);
    DatabaseCacheHandler
      .saveNewQuiznightRoundToCache(qnCode)
      .then((result) => {
        TeamMessageSender
          .toNamespace(quiznightNamespace)
          .usingSocket(socket)
          .sendMessageToAllTeams(MESSAGE_TYPES.PENDING, 'Round has started, waiting for next question.')
      });
  });

  socket.on(MESSAGE_TYPES.NEXT_QUESTION, (message) => {
    TeamMessageSender
      .toNamespace(quiznightNamespace)
      .usingSocket(socket)
      .sendMessageToAllTeams(MESSAGE_TYPES.NEW_QUESTION, { question: message.question._id, category: message.question.category });
  });

  socket.on(MESSAGE_TYPES.CLOSE_QUESTION, (message) => {
    TeamMessageSender
      .toNamespace(quiznightNamespace)
      .usingSocket(socket)
      .sendMessageToAllTeams(MESSAGE_TYPES.PENDING, 'Quizmaster is currently reviewing answers.');
  });

  socket.on(MESSAGE_TYPES.UPDATE_SCORE, (message) => {
    let qnCode = getQuiznightCodeFromSocket(socket);

    for(let givenAnswer of message.givenAnswers) {
      let socketId = TeamWebsocketConnectionsCacheHandler
        .getSocketIdFromTeam(qnCode, givenAnswer.teamName);

        console.log(givenAnswer);
      if(givenAnswer.isCorrect) {
        console.log('INCREMENT SCORE');
        DatabaseCacheHandler
          .incrementCorrectAnswersOfTeam(qnCode, message.round, givenAnswer.teamName);
      }
      TeamMessageSender
        .toNamespace(quiznightNamespace)
        .sendMessageToSocketViaId(socketId, MESSAGE_TYPES.ANSWER_REVIEWED, { correctAnswer: message.answer, isCorrect: givenAnswer.isCorrect });
    }
  });

  socket.on(MESSAGE_TYPES.END_ROUND, (message) => {
    // Loop door lijst met teams
    // 1. update roundpoints in database
  });

  socket.on(MESSAGE_TYPES.END_GAME, (message) => {
    // Loop door lijst met teams
    // 1. haal quiznight uit database
  });
}