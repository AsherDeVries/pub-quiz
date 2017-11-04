import DatabaseCacheHandler from '../../caching/database';
import { getQuiznightCodeFromSocket } from '../../utils';
import MESSAGE_TYPES from '../../constants/message_types';
import QuizmasterMessageSender from '../quizmaster/to-quizmaster';
import Quiznight from '../../../models/Quiznight';
import ROOM_NAMES from '../../constants/rooms';
import TeamMessageSender from '../teams/to-teams';

export default (socket, quiznightNamespace) => {

  socket.on(MESSAGE_TYPES.CONNECT_QUIZMASTER, (message) => {
    socket.join(ROOM_NAMES.QUIZMASTER);

    QuizmasterMessageSender
      .toNamespace(quiznightNamespace)
      .usingSocket(socket)
      .sendMessage(MESSAGE_TYPES.PENDING, 'Welcome to the quiznight quizmaster!, waiting for teams to apply..')
  });

  socket.on(MESSAGE_TYPES.ACCEPT_TEAM, (message) => {
    let messageToTeam = { isAccepted: message.isAccepted };
    if(!messageToTeam.isAccepted) {
      let qnCode = getQuiznightCodeFromSocket(socket);
      DatabaseCacheHandler
        .removeTeamInQuiznightFromCache(qnCode, message.teamName)
      .then(TeamMessageSender.disconnectSocket(message.socketId));
    } else {
      TeamMessageSender
        .toNamespace(quiznightNamespace)
        .usingSocket(socket)
        .sendMessageToSocketViaId(message.socketId, MESSAGE_TYPES.TEAM_ALLOWED, messageToTeam);
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
      .sendMessageToAllTeams(MESSAGE_TYPES.NEW_QUESTION, { question: message.question });
  });

  socket.on(MESSAGE_TYPES.CLOSE_QUESTION, (message) => {
    TeamMessageSender
      .toNamespace(quiznightNamespace)
      .usingSocket(socket)
      .sendMessageToAllTeams(MESSAGE_TYPES.PENDING, 'Quizmaster is currently reviewing answers.');
    //quiznightNamespace.to(ROOM_NAMES.TEAMS).emit(MESSAGE_TYPES.QUESTION_CLOSED, { question: message.question, givenAnswers: db.givenAnswers })    
    // WANNEER MOET SCOREBOARD GEINFORMEERD WORDEN OVER ANTWOORDEN VAN TEAMS??
  });

  socket.on(MESSAGE_TYPES.UPDATE_SCORE, (message) => {
    // message.question
    // message.givenAnswers: [
    // teamName: String,
    // answer: String
    // isCorrect: Boolean
    //]
    // Loop door lijst met teams
    // 1. Informeer over antwoord review
    // 2. Zet aantal goede antwoorden per team in db.
    // 3. Zet question op gereviewed in db
    TeamMessageSender
      .toNamespace(quiznightNamespace)
      .sendMessageToSocketViaId(message.socketId, MESSAGE_TYPES.ANSWER_REVIEWED, { isCorrect: message.answer });
      
    quiznightNamespace.to(ROOM_NAMES.QUIZMASTER).emit(MESSAGE_TYPES.ANSWER_REVIEWED, { question: message.question, answer: message.answer })
  });

  socket.on(MESSAGE_TYPES.END_ROUND, (message) => {
    // Loop door lijst met teams
    // 1. update roundpoints in database
  });

  socket.on(MESSAGE_TYPES.END_GAME, (message) => {
    // Loop door lijst met teams
    // 1. update roundpoints in database
  });
}