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

var _toScoreboard = require('../scoreboard/to-scoreboard');

var _toScoreboard2 = _interopRequireDefault(_toScoreboard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (socket, quiznightNamespace) {
  socket.on(_message_types2.default.CONNECT_TEAM, function (message) {
    var qnCode = (0, _utils.getQuiznightCodeFromSocket)(socket);
    _database2.default.saveNewTeamInQuiznightToCache(qnCode, message.teamName).then(function () {
      _toQuizmaster2.default.toNamespace(quiznightNamespace).usingSocket(socket).sendMessageToQuizmaster(_message_types2.default.TEAM_JOINED, {
        teamName: message.teamName,
        socketId: socket.id
      });
      socket.join(_rooms2.default.TEAMS);
    });
  });

  socket.on(_message_types2.default.SUBMIT_ANSWER, function (message) {
    var qnCode = (0, _utils.getQuiznightCodeFromSocket)(socket);
    _database2.default.saveAnswerOfTeamInRoundToCache(qnCode, message.round, message.teamName, message.question, message.answer).then(function () {
      _toQuizmaster2.default.toNamespace(quiznightNamespace).usingSocket(socket).sendMessageToQuizmaster(_message_types2.default.ANSWER_SUBMITTED, { question: message.question, answer: message.answer });

      _toScoreboard2.default.sendMessageToAllScoreboards(_message_types2.default.ANSWER_SUBMITTED, { teamName: message.teamName, hasAnswered: true });
    });
  });
};
//# sourceMappingURL=from-teams.js.map