'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Quiznight = require('../../../models/Quiznight');

var _Quiznight2 = _interopRequireDefault(_Quiznight);

var _retriever = require('../local/retriever');

var _retriever2 = _interopRequireDefault(_retriever);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DatabaseCacheHandler = {
  saveNewQuiznightRoundToCache: function saveNewQuiznightRoundToCache(quiznightCode) {
    // YEAH... QUICK AND DIRTY
    var newRoundNumber = null;

    return _Quiznight2.default.findOne({ _id: quiznightCode }, { rounds: 1 }).then(function (result) {
      newRoundNumber = result.rounds.length + 1;
      return _Quiznight2.default.update({ _id: quiznightCode }, { $push: { rounds: { _id: newRoundNumber, teamStatistics: [] } } });
    }).then(function () {
      return _Quiznight2.default.findOne({ _id: quiznightCode }, { teams: 1 });
    }).then(function (quiznight) {
      var promises = [];
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = quiznight.teams[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var teamName = _step.value;

          var p = _Quiznight2.default.update({ _id: quiznightCode, rounds: { $elemMatch: { _id: newRoundNumber } } }, { $push: { "rounds.0.teamStatistics": { team: teamName, givenAnswers: [], correctAnswersAmount: 0 } } });
          promises.push(p);
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

      return Promise.all(promises);
    });
  },
  removeTeamInQuiznightFromCache: function removeTeamInQuiznightFromCache(quiznightCode, teamName) {
    return _Quiznight2.default.update({ _id: quiznightCode }, { $pull: { teams: { _id: teamName } } });
  },
  saveNewTeamInQuiznightToCache: function saveNewTeamInQuiznightToCache(quiznightCode, teamName) {
    return _Quiznight2.default.update({ _id: quiznightCode }, { $push: { teams: { _id: teamName, roundPoints: 0 } } });
  },
  incrementCorrectAnswersOfTeam: function incrementCorrectAnswersOfTeam(quiznightCode, round, teamName) {
    round = _retriever2.default.getCurrentRoundInQuiznight(quiznightCode)._id;
    return _Quiznight2.default.findOne({
      _id: quiznightCode, rounds: { $elemMatch: { _id: round } }, "rounds.teamStatistics": { $elemMatch: { team: teamName } }
    }).then(function (quiznight) {
      var teamStatistics = quiznight.rounds[0].teamStatistics;
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = teamStatistics[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var teamStat = _step2.value;

          if (teamStat.team == teamName) {
            teamStat.correctAnswersAmount++;
          }
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

      return _Quiznight2.default.update({ _id: quiznightCode, rounds: { $elemMatch: { _id: round } } }, { $set: { "rounds.$.teamStatistics": teamStatistics } });
    });
  },
  saveAnswerOfTeamInRoundToCache: function saveAnswerOfTeamInRoundToCache(quiznightCode, round, teamName, question, answer) {
    return _Quiznight2.default.findOne({
      _id: quiznightCode, rounds: { $elemMatch: { _id: round } },
      "rounds.teamStatistics": { $elemMatch: { team: teamName } }
    }).then(function (quiznight) {
      var givenAnswersInRound = quiznight.rounds[0].teamStatistics[0].givenAnswers;

      // The Marius rule: "If it works... It works"
      if (givenAnswersInRound.length > 0) {
        for (var i = 0; i < givenAnswersInRound.length; i++) {
          if (givenAnswersInRound[i].question == question) {
            givenAnswersInRound[i].value = answer;
            return _Quiznight2.default.update({ _id: quiznightCode, rounds: { $elemMatch: { _id: round } }, "rounds.teamStatistics": { $elemMatch: { team: teamName } } }, { $set: { "rounds.0.teamStatistics.0.givenAnswers": givenAnswersInRound } });
          }
        }
      } else {
        return _Quiznight2.default.update({ _id: quiznightCode, rounds: { $elemMatch: { _id: round } }, "rounds.teamStatistics": { $elemMatch: { team: teamName } } }, { $push: { "rounds.0.teamStatistics.0.givenAnswers": { question: question, value: answer } } });
      }
    });
  },
  updateRoundPointsOfAllTeams: function updateRoundPointsOfAllTeams(quiznightCode) {
    var teams = _retriever2.default.getTeamsOfQuiznight(quiznightCode);

    return _Quiznight2.default.update({ _id: quiznightCode }, { $set: { teams: teams } });
  },
  updateQuestionToReviewed: function updateQuestionToReviewed(quiznightCode, round, question) {
    round = _retriever2.default.getCurrentRoundInQuiznight(quiznightCode)._id;
    return _Quiznight2.default.update({ _id: quiznightCode, rounds: { $elemMatch: { _id: round } }, "rounds.chosenQuestions": { $elemMatch: { _id: question } } }, { $set: { "rounds.0.chosenQuestions.0.hasBeenReviewed": true } });
  },
  removeQuiznight: function removeQuiznight(quiznightCode) {
    return _Quiznight2.default.remove({
      _id: quiznightCode
    });
  }
};

exports.default = DatabaseCacheHandler;
//# sourceMappingURL=index.js.map