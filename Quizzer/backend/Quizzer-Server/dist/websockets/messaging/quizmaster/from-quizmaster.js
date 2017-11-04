'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _database = require('../../caching/database');

var _database2 = _interopRequireDefault(_database);

var _utils = require('../../utils');

var _message_types = require('../../constants/message_types');

var _message_types2 = _interopRequireDefault(_message_types);

var _toQuizmaster = require('../quizmaster/to-quizmaster');

var _toQuizmaster2 = _interopRequireDefault(_toQuizmaster);

var _Quiznight = require('../../../models/Quiznight');

var _Quiznight2 = _interopRequireDefault(_Quiznight);

var _rooms = require('../../constants/rooms');

var _rooms2 = _interopRequireDefault(_rooms);

var _toTeams = require('../teams/to-teams');

var _toTeams2 = _interopRequireDefault(_toTeams);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (socket, quiznightNamespace) {

  socket.on(_message_types2.default.CONNECT_QUIZMASTER, function (message) {
    socket.join(_rooms2.default.QUIZMASTER);

    _toQuizmaster2.default.toNamespace(quiznightNamespace).usingSocket(socket).sendMessage(_message_types2.default.PENDING, 'Welcome to the quiznight quizmaster!, waiting for teams to apply..');
  });

  socket.on(_message_types2.default.ACCEPT_TEAM, function (message) {
    var messageToTeam = { isAccepted: message.isAccepted };
    if (!messageToTeam.isAccepted) {
      var qnCode = (0, _utils.getQuiznightCodeFromSocket)(socket);
      _database2.default.removeTeamInQuiznightFromCache(qnCode, message.teamName).then(_toTeams2.default.disconnectSocket(message.socketId));
    } else {
      console.log(messageToTeam);
      _toTeams2.default.toNamespace(quiznightNamespace).usingSocket(socket).sendMessageToSocketViaId(message.socketId, _message_types2.default.TEAM_ALLOWED, messageToTeam);
    }
  });

  socket.on(_message_types2.default.START_ROUND, function (message) {
    var qnCode = (0, _utils.getQuiznightCodeFromSocket)(socket);
    _database2.default.saveNewQuiznightRoundToCache(qnCode).then(function (result) {
      _toTeams2.default.toNamespace(quiznightNamespace).usingSocket(socket).sendMessageToAllTeams(_message_types2.default.PENDING, 'Round has started, waiting for next question.');
    });
  });

  socket.on(_message_types2.default.NEXT_QUESTION, function (message) {
    _toTeams2.default.toNamespace(quiznightNamespace).usingSocket(socket).sendMessageToAllTeams(_message_types2.default.NEW_QUESTION, { question: message.question });
  });

  socket.on(_message_types2.default.CLOSE_QUESTION, function (message) {
    _toTeams2.default.toNamespace(quiznightNamespace).usingSocket(socket).sendMessageToAllTeams(_message_types2.default.PENDING, 'Quizmaster is currently reviewing answers.');
    //quiznightNamespace.to(ROOM_NAMES.TEAMS).emit(MESSAGE_TYPES.QUESTION_CLOSED, { question: message.question, givenAnswers: db.givenAnswers })    
    // WANNEER MOET SCOREBOARD GEINFORMEERD WORDEN OVER ANTWOORDEN VAN TEAMS??
  });

  socket.on(_message_types2.default.UPDATE_SCORE, function (message) {
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
    quiznightNamespace.to(message.socket_id).emit(_message_types2.default.ANSWER_REVIEWED, { isCorrect: message.answer });
    quiznightNamespace.to(_rooms2.default.QUIZMASTER).emit(_message_types2.default.ANSWER_REVIEWED, { question: message.question, answer: message.answer });
  });

  socket.on(_message_types2.default.END_ROUND, function (message) {
    // Loop door lijst met teams
    // 1. update roundpoints in database
  });

  socket.on(_message_types2.default.END_GAME, function (message) {
    // Loop door lijst met teams
    // 1. update roundpoints in database
  });
};
//# sourceMappingURL=from-quizmaster.js.map