const WebsocketConnectionsCache = {
  connections: [],
  addQuiznightToCache(quiznightCode) {
    this.connections.push({
      quiznight: quiznightCode,
      quizmasters: [],
      teams: []
    })
  }
};
/*
connections: [
  {
    quiznight: String,
    quizmasters: [{
      socketId: String
    }],
    teams: [{
      name: String,
      socketId: String
    }]
  }
]
 */

export default WebsocketConnectionsCache;