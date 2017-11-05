const LocalDataStore = {
  data: {
    quizNights: []
  }
}

export default LocalDataStore;
/*
This data has the following data structure:
data: {
  quizNights: [{
    quiznight: String,
    state: {
      teams: [{
        _id: String,
        roundPoints: Number
      }],
      rounds: [{
        _id: Number,
        teamStatistics: [{
          team: String,
          givenAnswers:[{
            question: String,
            value: String
          }],
          correctAnswersAmount: Number
        }],
        chosenQuestions: [{
          _id: String,
          hasBeenReviewed: Boolean
        }]
      }]
    }
    connections: {
      teams: [{
        name: String,
        socketId: String
      }]
    }
  }]
}
 */