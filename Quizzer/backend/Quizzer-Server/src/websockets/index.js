import enableStartQuiznightWebsockets from './start-quiznight';

export default ({ quizmaster_credentials }, server) => {
  enableStartQuiznightWebsockets(quizmaster_credentials);
}