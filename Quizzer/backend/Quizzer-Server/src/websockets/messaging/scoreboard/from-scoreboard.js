import MESSAGE_TYPES from '../../constants/message_types';
import ROOM_NAMES from '../../constants/rooms';

export default (socket, quiznightNamespace) => {
  socket.on(MESSAGE_TYPES.CONNECT_SCOREBOARD, (message) => {
    socket.join(ROOM_NAMES.SCOREBOARD);
  });
}