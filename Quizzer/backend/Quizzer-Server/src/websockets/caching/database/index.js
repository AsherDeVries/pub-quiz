import Quiznight from '../../../models/Quiznight';

const DatabaseCacheHandler = {
  saveNewQuiznightRoundToCache: function(quiznightCode) {
    // YEAH... QUICK AND DIRTY
    let newRoundNumber = null;

    return Quiznight.findOne({ _id: quiznightCode }, { rounds: 1 })
      .then((result) => {
        newRoundNumber = result.rounds.length;
        return Quiznight
          .update(
            { _id: quiznightCode },
            { $push: { rounds: { _id: newRoundNumber, teamStatistics: [] } } });
      })
      .then(() => {
        return Quiznight.findOne({ _id: quiznightCode }, { teams: 1 });
      })
      .then((quiznight) => {
        let promises = [];
        for(let teamName of quiznight.teams) {
          let p = Quiznight.update(
            { _id: quiznightCode, rounds: { $elemMatch: { _id: newRoundNumber } } },
            { $push: { "rounds.0.teamStatistics": { team: teamName, givenAnswers: [], correctAnswersAmount: 0 } } })
          promises.push(p);
        }
        return Promise.all(promises);
      });
  },
  removeTeamInQuiznightFromCache: function(quiznightCode, teamName) {
    return Quiznight.update(
      { _id: quiznightCode },
      { $pull: { teams: { _id: teamName } } }
    );
  },
  saveNewTeamInQuiznightToCache: function(quiznightCode, teamName) {
    return Quiznight.update(
      { _id: quiznightCode },
      { $push: { teams: { _id: teamName, roundPoints: 0 } } }
    );
  },
  saveAnswerOfTeamInRoundToCache: function(quiznightCode, round, teamName, question, answer){
    return Quiznight.update(
      { _id: quiznightCode, rounds: { $elemMatch: { _id: round } },  "rounds.teamStatistics" : { $elemMatch: { team: teamName } } },
      { $set: { "rounds.0.teamStatistics.0.givenAnswers.$.value": answer } })
  }
};

export default DatabaseCacheHandler;