import mongoose from 'mongoose';

let quiznightSchema = new mongoose.Schema({
  _id: String,
  teams: [{
      _id: String,
      roundPoints: Number
    }],
  rounds: [{
    _id: Number,
    teamStatistics: [{
      team: {
        type: String,
        required: true,
      },
      givenAnswers:[{
        value: {
          type: String,
          minlength: 1
        }
      }],
      correctAnswersAmount: Number
    }],
    chosenQuestions: [{
      _id: {
        type: String,
        ref: 'Question'
      },
      hasBeenReviewed: {
        type: Boolean,
        required: true
      }
    }]
  }]
});

export default mongoose.model('Quiznight', quiznightSchema);
