"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var getQuiznightCodeFromSocket = exports.getQuiznightCodeFromSocket = function getQuiznightCodeFromSocket(socket) {
  var removeSlashPrefix = function removeSlashPrefix(socketNamespaceName) {
    return socketNamespaceName.substr(1);
  };

  return removeSlashPrefix(socket.nsp.name);
};
//# sourceMappingURL=utils.js.map