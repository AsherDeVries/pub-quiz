import { SCOREBOARD_STATE } from '../../constants/scoreboardState';

export default {
  roundNumber: 1,
  category: "Art and Literature",
  question: "Who wrote the Twilight series of novels?",
  scoreboardState: SCOREBOARD_STATE.SHOW_SCORES,
  teams: [
    {
      name: "team1",
      roundPoints: 4,
      hasAnswered: false,
      answer: "Stepenie Meyer",
      score: [
        {
          round: 1,
          questionsCorrect: 12
        }
      ]
    },
    {
      name: "team2",
      roundPoints: 0,
      hasAnswered: true,
      answer: "Stepenie Meyer"
    },
    {
      name: "team3",
      roundPoints: 0,
      hasAnswered: false,
      answer: "J.K. Rowling"
    },
    {
      name: "team4",
      roundPoints: 0,
      hasAnswered: true,
      answer: "Stepenie Meyer"
    },
    {
      name: "team5",
      roundPoints: 0,
      hasAnswered: false,
      answer: "Stepenie Meyer"
    }
  ],
};
