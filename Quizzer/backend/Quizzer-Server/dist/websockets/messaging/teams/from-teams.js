'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _database = require('../../data-stores/database');

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

var _toScoreboard = require('../scoreboard/to-scoreboard');

var _toScoreboard2 = _interopRequireDefault(_toScoreboard);

var _toTeams = require('../teams/to-teams');

var _toTeams2 = _interopRequireDefault(_toTeams);

var _local = require('../../data-stores/local');

var _local2 = _interopRequireDefault(_local);

var _retriever = require('../../data-stores/local/retriever');

var _retriever2 = _interopRequireDefault(_retriever);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (socket, quiznightNamespace) {
  socket.on(_message_types2.default.CONNECT_TEAM, function (message) {
    var quiznightCode = (0, _utils.getQuiznightCodeFromSocket)(socket);

    var currentAmountOfConnections = _retriever2.default.getTeamsOfQuiznight(quiznightCode);
    var MAX_ALLOWED_CONNECTIONS = 6;
    if (currentAmountOfConnections.length < MAX_ALLOWED_CONNECTIONS) {
      _local2.default.addTeamConnectionToCache(quiznightCode, message.teamName, socket);

      _local2.default.saveNewTeamInQuiznightToCache(quiznightCode, message.teamName);

      _database2.default.saveNewTeamInQuiznightToCache(quiznightCode, message.teamName).then(function () {
        _toQuizmaster2.default.toNamespace(quiznightNamespace).usingSocket(socket).sendMessageToQuizmaster(_message_types2.default.TEAM_JOINED, {
          teamName: message.teamName,
          socketId: socket.id
        });

        _toTeams2.default.toNamespace(quiznightNamespace).usingSocket(socket).sendMessageToSocketViaId(socket.id, _message_types2.default.PENDING, 'Welcome to the quiznight!, waiting for approval of quizmaster..');

        socket.join(_rooms2.default.TEAMS);
      });
    } else {
      _toTeams2.default.toNamespace(quiznightNamespace).usingSocket(socket).sendMessageToSocketViaId(socket.id, _message_types2.default.PENDING, 'Sorry, quiznight is full.');
    }
  });

  socket.on(_message_types2.default.SUBMIT_ANSWER, function (message) {
    var qnCode = (0, _utils.getQuiznightCodeFromSocket)(socket);
    _local2.default.saveAnswerOfTeamInRoundToCache(qnCode, message.round, message.teamName, message.question, message.answer);

    var round = _retriever2.default.getCurrentRoundInQuiznight(qnCode);

    _database2.default.saveAnswerOfTeamInRoundToCache(qnCode, round, message.teamName, message.question, message.answer).then(function () {
      _toQuizmaster2.default.toNamespace(quiznightNamespace).usingSocket(socket).sendMessageToQuizmaster(_message_types2.default.ANSWER_RECEIVED, { teamName: message.teamName, answer: message.answer, reSubmit: message.reSubmit });

      _toScoreboard2.default.sendMessageToAllScoreboards(_message_types2.default.ANSWER_SUBMITTED, { teamName: message.teamName, hasAnswered: true });
    });
  });
};
//# sourceMappingURL=from-teams.js.map