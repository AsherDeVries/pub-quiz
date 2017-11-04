const TeamWebsocketConnectionsCacheHandler = {
  quiznightConnections: [],
  addQuiznightToCache(quiznightCode) {
    this.quiznightConnections.push({
      quiznightCode: quiznightCode,
      teams: []
    });
  },
  addTeamToCache(quiznightCode, teamName, socket) {
    var quiznight = this.quiznightConnections.find((object) => {
      return object.quiznightCode == quiznightCode;
    });
    quiznight.teams.push({
      teamName: teamName,
      socketId: socket.id
    });
  },
  getSocketIdFromTeam(quiznightCode, teamName) {
    var quiznight = this.quiznightConnections.find((object) => {
      return object.quiznightCode == quiznightCode;
    });
    var team = quiznight.teams.find((object) => {
      return object.teamName == teamName;
    });
    return team.socketId;
  }
};
/*
  [{
    quiznightCode: String,
    teams: [{
      teamName: String,
      socketId: String
    }]
  }]
*/

export default TeamWebsocketConnectionsCacheHandler;