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
      _id: { 
        auto: false 
      },
      team: {
        type: String,
        required: true
      },
      givenAnswers:[{
        _id: { 
          auto: false 
        },
        question: {
          type: String,
          required: true
        },
        value: {
          type: String,
          required: true
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
