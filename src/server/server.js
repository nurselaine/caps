'use strict';

const { Server } = require('socket.io');
const eventLogger = require('../util');


const PORT = process.env.PORT || 3002;
const server = new Server(PORT);

const caps = server.of('/caps'); 

caps.on('connection', (socket) => {

  socket.on('JOIN', (room) => {
    console.log(`You've join the ${room} room!`);
  });

  socket.on('PICKUP', (payload) => {
    eventLogger(payload, 'pickup');

    caps.emit('PICKUP', payload);
  });

  socket.on('IN-TRANSIT', (payload) => {

    eventLogger(payload, 'in-transit');
  })

  socket.on('DELIVERED', (payload) => {

    eventLogger(payload, 'delivered');
    caps.emit('DELIVERED', payload);
  })

});

module.exports = { caps };