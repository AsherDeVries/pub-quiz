'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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
    var quiznightRound = Object.create(_retriever2.default.getCurrentRoundInQuiznight(quiznightCode));
    var teamsDataToSend = [];
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = quiznightRound.teamStatistics[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var teamStat = _step.value;

        var givenAnswerOfTeam = _retriever2.default.getGivenAnswerToQuestion(teamStat, question);

        teamsDataToSend.push({
          teamName: teamStat.team,
          givenAnswer: givenAnswerOfTeam
        });
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

    var answersPerTeam = teamsDataToSend;
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = answersPerTeam[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var answerOfTeam = _step2.value;

        answerOfTeam.hasAnswered = false;
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

    console.log("SEND QUESTION");
    console.log(answersPerTeam);

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
    var data = _retriever2.default.getQuiznightByCode(quiznightCode);

    var qn = Object.create(data);
    var teams = qn.state.teams;
    var quizRound = _retriever2.default.getCurrentRoundInQuiznight(quiznightCode);

    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
      for (var _iterator3 = teams[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
        var team = _step3.value;

        var teamStats = _retriever2.default.getTeamStatisticsOfTeamInCurrentRound(quiznightCode, team._id);
        team.score = {
          round: quizRound._id,
          questionsCorrect: teamStats.correctAnswersAmount
        };
      }
    } catch (err) {
      _didIteratorError3 = true;
      _iteratorError3 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion3 && _iterator3.return) {
          _iterator3.return();
        }
      } finally {
        if (_didIteratorError3) {
          throw _iteratorError3;
        }
      }
    }

    this.sendMessageToAllScoreboards(_message_types2.default.SHOW_SCORES, {
      teams: teams
    });
  }
};

exports.default = ScoreboardMessageSender;
//# sourceMappingURL=to-scoreboard.js.map