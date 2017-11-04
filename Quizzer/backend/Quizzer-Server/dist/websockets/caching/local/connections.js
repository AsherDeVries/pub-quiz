"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var WebsocketConnectionsCache = {
  connections: [],
  addQuiznightToCache: function addQuiznightToCache(quiznightCode) {
    this.connections.push({
      quiznight: quiznightCode,
      quizmasters: [],
      teams: []
    });
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

exports.default = WebsocketConnectionsCache;
//# sourceMappingURL=connections.js.map