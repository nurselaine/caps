'use strict';

const { io } = require('socket.io-client');
const socket = io('http://localhost:3002/caps');

const createTransitMessage = require('./handlerDrivers');
const handleTransitMessage = createTransitMessage(socket);

socket.emit('JOIN', 'driver');

socket.on('PICKUP', (payload) => {
  handleTransitMessage(payload);
});