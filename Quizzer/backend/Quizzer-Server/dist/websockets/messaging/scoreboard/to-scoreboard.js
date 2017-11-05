'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _message_types = require('../../constants/message_types');

var _message_types2 = _interopRequireDefault(_message_types);

var _rooms = require('../../constants/rooms');

var _rooms2 = _interopRequireDefault(_rooms);

var _retriever = require('../../data-stores/local/retriever');

var _retriever2 = _interopRequireDefault(_retriever);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ScoreboardMessageSender = {
  toNamespace: function toNamespace(namespace) {
    this.namespace = namespace;
    return this;
  },
  usingSocket: function usingSocket(socket) {
    this.socket = socket;
    return this;
  },
  sendMessage: function sendMessage(messageType, message) {
    this.socket.emit(messageType, message);
  },
  sendMessageToAllScoreboards: function sendMessageToAllScoreboards(messageType, message) {
    this.namespace.to(_rooms2.default.SCOREBOARD).emit(messageType, message);
  },
  sendNewQuestionMessage: function sendNewQuestionMessage(quiznightCode, question, category) {
    var answersPerTeam = _extends({}, _retriever2.default.getGivenAnswersOfQuestionPerTeam(quiznightCode, question));
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = answersPerTeam[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var answerOfTeam = _step.value;

        answerOfTeam.hasAnswered = false;
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

    this.sendMessageToAllScoreboards(_message_types2.default.NEW_QUESTION, {
      question: { question: question, category: category },
      teams: answersPerTeam
    });
  },
  sendShowQuestionResultsMessage: function sendShowQuestionResultsMessage(quiznightCode, question, category) {
    this.sendMessageToAllScoreboards(_message_types2.default.SHOW_QUESTION_RESULTS, {
      question: { question: question, category: category },
      teams: _retriever2.default.getGivenAnswersOfQuestionPerTeam(quiznightCode, question)
    });
  },
  sendShowScoresMessage: function sendShowScoresMessage(quiznightCode) {
    var teams = _extends({}, _retriever2.default.getQuiznightByCode(quiznightCode).teams);
    var quizRound = _retriever2.default.getCurrentRoundInQuiznight(quiznightCode);

    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = teams[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var team = _step2.value;

        var teamStats = _retriever2.default.getTeamStatisticsOfTeamInCurrentRound(quiznightCode, team._id);
        team.score = {
          round: quizRound._id,
          questionsCorrect: teamStats.correctAnswersAmount
        };
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }

    this.sendMessageToAllScoreboards(_message_types2.default.SHOW_QUESTION_RESULTS, {
      question: { question: question, category: category },
      teams: teams
    });
  }
};

exports.default = ScoreboardMessageSender;
//# sourceMappingURL=to-scoreboard.js.map