"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var TeamWebsocketConnectionsCacheHandler = {
  quiznightConnections: [],
  addQuiznightToCache: function addQuiznightToCache(quiznightCode) {
    this.quiznightConnections.push({
      quiznightCode: quiznightCode,
      teams: []
    });
  },
  addTeamToCache: function addTeamToCache(quiznightCode, teamName, socket) {
    var quiznight = this.quiznightConnections.find(function (object) {
      return object.quiznightCode == quiznightCode;
    });
    quiznight.teams.push({
      teamName: teamName,
      socketId: socket.id
    });
  },
  getSocketIdFromTeam: function getSocketIdFromTeam(quiznightCode, teamName) {
    var quiznight = this.quiznightConnections.find(function (object) {
      return object.quiznightCode == quiznightCode;
    });
    var team = quiznight.teams.find(function (object) {
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

exports.default = TeamWebsocketConnectionsCacheHandler;
//# sourceMappingURL=connections.js.map