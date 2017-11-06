"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Quiznight = require("../../../models/Quiznight");

var _Quiznight2 = _interopRequireDefault(_Quiznight);

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
    return _Quiznight2.default.findOne({
      _id: quiznightCode, rounds: { $elemMatch: { _id: round } }, "rounds.teamStatistics": { $elemMatch: { team: teamName } }
    }).then(function (quiznight) {
      var correctAnswersAmount = quiznight.rounds[0].teamStatistics[0].correctAnswersAmount;
      console.log(quiznight.rounds[0].teamStatistics[0]);
      correctAnswersAmount++;

      return _Quiznight2.default.update({ _id: quiznightCode, rounds: { $elemMatch: { _id: round } }, "rounds.teamStatistics": { $elemMatch: { team: teamName } } }, { $set: { "rounds.0.teamStatistics.0.correctAnswersAmount": correctAnswersAmount } });
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
  updateQuestionToReviewed: function updateQuestionToReviewed(quiznightCode, round, question) {
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