import LocalDataStore from './store';

const LocalDataStoreRetriever = {
  getGivenAnswerToQuestion(teamStatistics, question) {
    return teamStatistics.givenAnswers.find((givenAnswer) => {
      return givenAnswer.question == question;
    });
  },
  getTeamStatisticsOfTeamInCurrentRound(quiznightCode, teamName) {
    let quiznight = this.getQuiznightByCode(quiznightCode);
    let currentRoundState = this.getCurrentRoundInQuiznight(quiznightCode);
    return currentRoundState.teamStatistics.find((teamStats) => {
      return teamStats.team == teamName;
    });
  },
  getCurrentRoundInQuiznight(quiznightCode) {
    let quiznight = this.getQuiznightByCode(quiznightCode);
    let amountOfRounds = quiznight.state.rounds.length;
    return quiznight.state.rounds[amountOfRounds-1];
  },
  getTeamOfQuiznightByName(quiznightCode, teamName) {
    let quiznight = this.getQuiznightByCode(quiznightCode);
    return quiznight.state.teams.find((team) => {
      return team.teamName == teamName;
    });
  },
  getQuiznightByCode(quiznightCode) {
    return LocalDataStore.data.quizNights.find((quiznight) => {
      return quiznight.quiznightCode == quiznightCode;
    });
  },
  getTeamsOfQuiznight(quiznightCode) {
    let quiznight = this.getQuiznightByCode(quiznightCode);
    return quiznight.state.teams;
  }
}

export default LocalDataStoreRetriever;