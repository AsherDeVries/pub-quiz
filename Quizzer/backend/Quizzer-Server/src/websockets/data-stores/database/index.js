import Quiznight from '../../../models/Quiznight';
import LocalDataStoreRetriever from '../local/retriever';

const DatabaseCacheHandler = {
  saveNewQuiznightRoundToCache(quiznightCode) {
    // YEAH... QUICK AND DIRTY
    let newRoundNumber = null;

    return Quiznight.findOne({ _id: quiznightCode }, { rounds: 1 })
      .then((result) => {
        newRoundNumber = result.rounds.length+1;
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
  removeTeamInQuiznightFromCache(quiznightCode, teamName) {
    return Quiznight.update(
      { _id: quiznightCode },
      { $pull: { teams: { _id: teamName } } }
    );
  },
  saveNewTeamInQuiznightToCache(quiznightCode, teamName) {
    return Quiznight.update(
      { _id: quiznightCode },
      { $push: { teams: { _id: teamName, roundPoints: 0 } } }
    );
  },
  incrementCorrectAnswersOfTeam(quiznightCode, round, teamName) {
    round = LocalDataStoreRetriever.getCurrentRoundInQuiznight(quiznightCode)._id;
    return Quiznight.findOne({ 
      _id: quiznightCode, rounds: { $elemMatch: { _id: round } },  "rounds.teamStatistics" : { $elemMatch: { team: teamName } } 
    })
    .then((quiznight) => {
      let teamStatistics = quiznight.rounds[0].teamStatistics;
      for(let teamStat of teamStatistics) {
        if(teamStat.team == teamName) {
          teamStat.correctAnswersAmount++;
        }
      }

      return Quiznight.update(
        { _id: quiznightCode, rounds: { $elemMatch: { _id: round } } },
        { $set: { "rounds.$.teamStatistics": teamStatistics } }
      );
    });
  },
  saveAnswerOfTeamInRoundToCache(quiznightCode, round, teamName, question, answer) {
    return Quiznight.findOne({ 
      _id: quiznightCode, rounds: { $elemMatch: { _id: round } },
      "rounds.teamStatistics" : { $elemMatch: { team: teamName } }
    })
    .then((quiznight) => {
      let givenAnswersInRound = quiznight.rounds[0].teamStatistics[0].givenAnswers;

      // The Marius rule: "If it works... It works"
      if(givenAnswersInRound.length > 0) {
        for(let i = 0; i < givenAnswersInRound.length; i++) {
          if(givenAnswersInRound[i].question == question) {
            givenAnswersInRound[i].value = answer;
            return Quiznight.update(
              { _id: quiznightCode, rounds: { $elemMatch: { _id: round } },  "rounds.teamStatistics" : { $elemMatch: { team: teamName } } },
              { $set: { "rounds.0.teamStatistics.0.givenAnswers": givenAnswersInRound } }
            );
          }
        }
      } else {
        return Quiznight.update(
          { _id: quiznightCode, rounds: { $elemMatch: { _id: round } },  "rounds.teamStatistics" : { $elemMatch: { team: teamName } } },
          { $push: { "rounds.0.teamStatistics.0.givenAnswers": { question: question, value: answer } } }
        );
      }
    })
  },
  updateRoundPointsOfAllTeams(quiznightCode) {
    let teams = LocalDataStoreRetriever.getTeamsOfQuiznight(quiznightCode);

    return Quiznight.update(
      { _id: quiznightCode },
      { $set: { teams: teams } }
    );
  },
  updateQuestionToReviewed(quiznightCode, round, question) {
    round = LocalDataStoreRetriever.getCurrentRoundInQuiznight(quiznightCode)._id;
    return Quiznight.update(
      { _id: quiznightCode, rounds: { $elemMatch: { _id: round } },  "rounds.chosenQuestions" : { $elemMatch: { _id: question } } },
      { $set: { "rounds.0.chosenQuestions.0.hasBeenReviewed": true } }
    );
  },
  removeQuiznight(quiznightCode) {
    return Quiznight.remove({
      _id: quiznightCode
    })
  }
};

export default DatabaseCacheHandler;