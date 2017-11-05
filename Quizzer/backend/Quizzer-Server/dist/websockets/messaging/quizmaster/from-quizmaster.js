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

var _connections = require('../../caching/connections');

var _connections2 = _interopRequireDefault(_connections);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (socket, quiznightNamespace) {

  socket.on(_message_types2.default.CONNECT_QUIZMASTER, function (message) {
    socket.join(_rooms2.default.QUIZMASTER);

    _toQuizmaster2.default.toNamespace(quiznightNamespace).usingSocket(socket).sendMessage(_message_types2.default.PENDING, 'Welcome to the quiznight quizmaster!, waiting for teams to apply..');
  });

  socket.on(_message_types2.default.ACCEPT_TEAM, function (message) {
    var messageToTeam = { accepted: message.team.isAccepted };

    _toTeams2.default.toNamespace(quiznightNamespace).usingSocket(socket).sendMessageToSocketViaId(message.team.socketId, _message_types2.default.TEAM_ALLOWED, messageToTeam);

    if (!messageToTeam.isAccepted) {
      var qnCode = (0, _utils.getQuiznightCodeFromSocket)(socket);
      _database2.default.removeTeamInQuiznightFromCache(qnCode, message.team.teamName).then(_toTeams2.default.disconnectSocket(message.team.socketId));
    }
  });

  socket.on(_message_types2.default.START_ROUND, function (message) {
    var qnCode = (0, _utils.getQuiznightCodeFromSocket)(socket);
    _database2.default.saveNewQuiznightRoundToCache(qnCode).then(function (result) {
      _toTeams2.default.toNamespace(quiznightNamespace).usingSocket(socket).sendMessageToAllTeams(_message_types2.default.PENDING, 'Round has started, waiting for next question.');
    });
  });

  socket.on(_message_types2.default.NEXT_QUESTION, function (message) {
    _toTeams2.default.toNamespace(quiznightNamespace).usingSocket(socket).sendMessageToAllTeams(_message_types2.default.NEW_QUESTION, { question: message.question._id, category: message.question.category });
  });

  socket.on(_message_types2.default.CLOSE_QUESTION, function (message) {
    _toTeams2.default.toNamespace(quiznightNamespace).usingSocket(socket).sendMessageToAllTeams(_message_types2.default.PENDING, 'Quizmaster is currently reviewing answers.');
  });

  socket.on(_message_types2.default.UPDATE_SCORE, function (message) {
    var qnCode = (0, _utils.getQuiznightCodeFromSocket)(socket);

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = message.givenAnswers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var givenAnswer = _step.value;

        var socketId = _connections2.default.getSocketIdFromTeam(qnCode, givenAnswer.teamName);

        if (givenAnswer.isCorrect) {
          _database2.default.incrementCorrectAnswersOfTeam(qnCode, message.round, givenAnswer.teamName);
        }
        _toTeams2.default.toNamespace(quiznightNamespace).sendMessageToSocketViaId(socketId, _message_types2.default.ANSWER_REVIEWED, { correctAnswer: message.answer, isCorrect: givenAnswer.isCorrect });
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  });

  socket.on(_message_types2.default.END_ROUND, function (message) {
    // Loop door lijst met teams
    // 1. update roundpoints in database
  });

  socket.on(_message_types2.default.END_GAME, function (message) {
    // Loop door lijst met teams
    // 1. haal quiznight uit database
  });
};
//# sourceMappingURL=from-quizmaster.js.map