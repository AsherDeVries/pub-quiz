'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _store = require('./store');

var _store2 = _interopRequireDefault(_store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LocalDataStoreRetriever = {
  getGivenAnswerToQuestion: function getGivenAnswerToQuestion(teamStatistics, question) {
    return teamStatistics.givenAnswers.find(function (givenAnswer) {
      return givenAnswer.question == question;
    });
  },
  getGivenAnswersOfQuestionPerTeam: function getGivenAnswersOfQuestionPerTeam(quiznightCode, question) {
    var quiznightRound = LocalDataStoreRetriever.getCurrentRoundInQuiznight(quiznightCode);
    var teamsDataToSend = [];
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = quiznightRound.teamStatistics[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var teamStat = _step.value;

        var givenAnswerOfTeam = this.getGivenAnswerToQuestion(teamStat, question);

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

    return teamsDataToSend;
  },
  getTeamStatisticsOfTeamInCurrentRound: function getTeamStatisticsOfTeamInCurrentRound(quiznightCode, teamName) {
    var quiznight = this.getQuiznightByCode(quiznightCode);
    var currentRoundState = this.getCurrentRoundInQuiznight(quiznightCode);
    return currentRoundState.teamStatistics.find(function (teamStats) {
      return teamStats.team == teamName;
    });
  },
  getCurrentRoundInQuiznight: function getCurrentRoundInQuiznight(quiznightCode) {
    var quiznight = this.getQuiznightByCode(quiznightCode);
    var amountOfRounds = quiznight.state.rounds.length;
    return quiznight.state.rounds[amountOfRounds - 1];
  },
  getTeamOfQuiznightByName: function getTeamOfQuiznightByName(quiznightCode, teamName) {
    var quiznight = this.getQuiznightByCode(quiznightCode);
    return quiznight.state.teams.find(function (team) {
      return team.teamName == teamName;
    });
  },
  getAllQuiznights: function getAllQuiznights() {
    return _store2.default.data.quizNights;
  },
  getQuiznightByCode: function getQuiznightByCode(quiznightCode) {
    return _store2.default.data.quizNights.find(function (quiznight) {
      return quiznight.quiznightCode == quiznightCode;
    });
  },
  getTeamsOfQuiznight: function getTeamsOfQuiznight(quiznightCode) {
    var quiznight = this.getQuiznightByCode(quiznightCode);
    return quiznight.state.teams;
  }
};

exports.default = LocalDataStoreRetriever;
//# sourceMappingURL=retriever.js.map