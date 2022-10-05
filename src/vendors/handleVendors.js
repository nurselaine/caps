'use strict';

module.exports = (socket) => (payload) => {
  socket.emit('PICKUP', { payload });
};