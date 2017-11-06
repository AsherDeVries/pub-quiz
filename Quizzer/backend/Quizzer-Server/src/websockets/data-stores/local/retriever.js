import LocalDataStore from './store';

const LocalDataStoreRetriever = {
  getGivenAnswerToQuestion(teamStatistics, question) {
    return teamStatistics.givenAnswers.find((givenAnswer) => {
      return givenAnswer.question == question;
    });
  },
  getGivenAnswersOfQuestionPerTeam(quiznightCode, question) {
    let quiznightRound = LocalDataStoreRetriever.getCurrentRoundInQuiznight(quiznightCode);
    let teamsDataToSend = [];
    for(let teamStat of quiznightRound.teamStatistics) {
      let givenAnswerOfTeam = this.getGivenAnswerToQuestion(teamStat, question);

      teamsDataToSend.push({
        teamName: teamStat.team,
        givenAnswer: givenAnswerOfTeam
      });
    }
    return teamsDataToSend;
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
      return team._id == teamName;
    });
  },
  getAllQuiznights() {
    return LocalDataStore.data.quizNights;
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