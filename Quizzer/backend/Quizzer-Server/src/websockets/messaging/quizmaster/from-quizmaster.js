import DatabaseCacheHandler from '../../data-stores/database';
import { getQuiznightCodeFromSocket } from '../../utils';
import MESSAGE_TYPES from '../../constants/message_types';
import QuizmasterMessageSender from '../quizmaster/to-quizmaster';
import Quiznight from '../../../models/Quiznight';
import ROOM_NAMES from '../../constants/rooms';
import ScoreboardMessageSender from '../scoreboard/to-scoreboard';
import TeamMessageSender from '../teams/to-teams';
import LocalDataStoreHandler from '../../data-stores/local';

export default (socket, quiznightNamespace) => {

  socket.on(MESSAGE_TYPES.CONNECT_QUIZMASTER, (message) => {
    socket.join(ROOM_NAMES.QUIZMASTER);

    QuizmasterMessageSender
      .toNamespace(quiznightNamespace)
      .usingSocket(socket)
      .sendMessage(MESSAGE_TYPES.PENDING, 'Welcome to the quiznight quizmaster!, waiting for teams to apply..')
  });

  socket.on(MESSAGE_TYPES.ACCEPT_TEAM, (message) => {
    let messageToTeam = { isAccepted: message.team.isAccepted };
    TeamMessageSender
      .toNamespace(quiznightNamespace)
      .usingSocket(socket)
      .sendMessageToSocketViaId(message.team.socketId, MESSAGE_TYPES.TEAM_ALLOWED, "Accepted, waiting for other teams..");

    if(!messageToTeam.isAccepted) {
      let qnCode = getQuiznightCodeFromSocket(socket);
      LocalDataStoreHandler
        .removeTeamInQuiznightFromCache(qnCode, message.team.teamName);

      DatabaseCacheHandler
        .removeTeamInQuiznightFromCache(qnCode, message.team.teamName)
      .then(TeamMessageSender.disconnectSocket(message.team.socketId));
      // TODO: leave werkt nog niet
    }
  });

  socket.on(MESSAGE_TYPES.START_ROUND, (message) => {
    let qnCode = getQuiznightCodeFromSocket(socket);
    LocalDataStoreHandler
      .saveNewQuiznightRoundToCache(qnCode);

    DatabaseCacheHandler
      .saveNewQuiznightRoundToCache(qnCode)
      .then((result) => {
        TeamMessageSender
          .toNamespace(quiznightNamespace)
          .usingSocket(socket)
          .sendMessageToAllTeams(MESSAGE_TYPES.PENDING, 'Round has started, waiting for the quizmaster to submit questions')
      });
  });

  socket.on(MESSAGE_TYPES.NEXT_QUESTION, (message) => {
    TeamMessageSender
      .toNamespace(quiznightNamespace)
      .usingSocket(socket)
      .sendMessageToAllTeams(MESSAGE_TYPES.NEW_QUESTION, { question: message.question });

    let qnCode = getQuiznightCodeFromSocket(socket);
    ScoreboardMessageSender
      .toNamespace(quiznightNamespace)
      .usingSocket(socket)
      .sendNewQuestionMessage(qnCode, message.question._id, message.question.category);
  });

  socket.on(MESSAGE_TYPES.CLOSE_QUESTION, (message) => {
    TeamMessageSender
      .toNamespace(quiznightNamespace)
      .usingSocket(socket)
      .sendMessageToAllTeams(MESSAGE_TYPES.PENDING, 'Quizmaster is currently reviewing answers.');

    let qnCode = getQuiznightCodeFromSocket(socket);
    ScoreboardMessageSender
      .toNamespace(quiznightNamespace)
      .usingSocket(socket)
      .sendShowQuestionResultsMessage(qnCode, message.question._id, message.question.category);
  });

  socket.on(MESSAGE_TYPES.UPDATE_SCORE, (message) => {
    let qnCode = getQuiznightCodeFromSocket(socket);
    for(let givenAnswer of message.givenAnswers) {
      let socketId = LocalDataStoreHandler
        .getSocketIdFromTeam(qnCode, givenAnswer.teamName);

      if(givenAnswer.isCorrect) {
        LocalDataStoreHandler
          .incrementCorrectAnswersOfTeam(qnCode, message.round, givenAnswer.teamName);

        DatabaseCacheHandler
          .incrementCorrectAnswersOfTeam(qnCode, message.round, givenAnswer.teamName);
      }
      TeamMessageSender
        .toNamespace(quiznightNamespace)
        .sendMessageToSocketViaId(socketId, MESSAGE_TYPES.ANSWER_REVIEWED, { correctAnswer: message.answer, isCorrect: givenAnswer.isCorrect });
    }
    // TODO: zet vraag op gereviewed bij chosenquestions
  });

  socket.on(MESSAGE_TYPES.END_ROUND, (message) => {
    // Loop door lijst met teams
    // 1. update roundpoints in database
    let qnCode = getQuiznightCodeFromSocket(socket);

    LocalDataStoreHandler
      .updateRoundPointsOfAllTeams(qnCode);

    ScoreboardMessageSender
      .toNamespace(quiznightNamespace)
      .usingSocket(socket)
      .sendShowScoresMessage();

    TeamMessageSender
      .toNamespace(quiznightNamespace)
      .usingSocket(socket)
      .sendMessageToAllTeams(MESSAGE_TYPES.PENDING, 'Round has ended');

    LocalDataStoreHandler
    .updateRoundPointsOfAllTeams(qnCode);
  });

  socket.on(MESSAGE_TYPES.END_GAME, (message) => {
    // Loop door lijst met teams
    // 1. haal quiznight uit database
    let qnCode = getQuiznightCodeFromSocket(socket);

    LocalDataStoreHandler
      .removeQuiznightByCode(qnCode);

    DatabaseCacheHandler
      .removeQuiznight(qnCode)
      .then(() => {
        TeamMessageSender
          .toNamespace(quiznightNamespace)
          .usingSocket(socket)
          .sendMessageToAllTeams(MESSAGE_TYPES.PENDING, 'Game has ended');
      });
  });
}