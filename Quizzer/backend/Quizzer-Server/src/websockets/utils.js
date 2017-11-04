export const getQuiznightCodeFromSocket = (socket) => {
  const removeSlashPrefix = (socketNamespaceName) => {
    return socketNamespaceName.substr(1);
  }

  return removeSlashPrefix(socket.nsp.name);
}