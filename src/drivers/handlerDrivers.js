'use strict';

module.exports = (socket) => (payload) => {
  const orderId = payload.payload.orderId;
  console.log(`DRIVER: picked up your package! ${orderId}`);
  socket.emit('IN-TRANSIT', payload);
  socket.emit('DELIVERED', payload);
};