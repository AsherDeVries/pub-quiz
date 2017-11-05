import initialState from './initial-quiznight-state';
import { QUIZNIGHT_ACTION_TYPES } from '../../constants/actionTypes';

export default function quiznightReducer(state = initialState, action) {
  switch (action.type) {
    case QUIZNIGHT_ACTION_TYPES.SET_QUIZNIGHT:
      return {
        ...state,
        _id: action.quiznight._id
      };
    case QUIZNIGHT_ACTION_TYPES.NEW_TEAM:
      return {
        ...state,
        teams: [...state.teams, action.team]
      };
    case QUIZNIGHT_ACTION_TYPES.DECLINE_TEAM:
     return {
       ...state,
       teams: state.teams.filter(team => (team.teamName !== action.team.teamName))
     };
    case QUIZNIGHT_ACTION_TYPES.ACCEPT_TEAM:
      return {
        ...state,
        teams: state.teams.map(team => {
          if  (team.teamName == action.team.teamName) {
            return action.team;
          }
          return team;
        })
      };
    case QUIZNIGHT_ACTION_TYPES.ROUND_QUESTION_RECEIVED:
      return {
        ...state,
        currentQuestion: action.question,
        questionSequenceNr: action.questionSequenceNr
      };
    case QUIZNIGHT_ACTION_TYPES.ANSWER_RECEIVED:
      return {
        ...state,
        currentSubmittedAnswers: [...state.currentSubmittedAnswers, action.answer]
      };
    case QUIZNIGHT_ACTION_TYPES.ANSWER_RESUBMITTED:
      return {
        ...state,
        currentSubmittedAnswers: state.currentSubmittedAnswers.map(answer => {
          if(answer.teamName === action.answer.teamName) {
            return action.answer;
          }
          return answer;
        })
      };
    case QUIZNIGHT_ACTION_TYPES.SET_AMOUNT_QUESTIONS_PER_ROUND:
      return {
        ...state,
        questionsPerRound: action.questionsPerRound
      };
    case QUIZNIGHT_ACTION_TYPES.EMPTY_CURRENT_QUESTION:
      return {
        ...state,
        currentQuestion: action.currentQuesiton,
        currentSubmittedAnswers: action.currentSubmittedAnswers
      };
    case QUIZNIGHT_ACTION_TYPES.EMPTY_STATE:
      return {
        ...state,
        currentQuestion: action.currentQuesiton,
        currentSubmittedAnswers: action.currentSubmittedAnswers,
        questionSequenceNr: action.questionSequenceNr,
        questionsPerRound: action.questionsPerRound,
      };
    default:
      return state;
  }
}
