'use strict';

const { io } = require('socket.io-client');
const socket = io('http://localhost:3002/caps');
const MessageClient = require('../lib/MessageClient');
const recipient = new MessageClient('driver');

const createTransitMessage = require('./handlerDrivers');
const handleTransitMessage = createTransitMessage(socket);

// socket.emit('JOIN', 'driver');

recipient.subscribe('RECEIVED', payload => {
  console.log(`message received ${payload.payload}`);
})

recipient.subscribe('PICKUP', (payload) => {
  
  recipient.publish('IN-TRANSIT', payload);
  // setTimeout(() => {
    console.log(`DRIVER: delivered your package! ${payload.payload.orderId}`);
    recipient.publish('DELIVERED', payload);
  // }, 1000)
});

// socket.on('IN-TRANSIT', (payload) => {
//   socket.emit('IN-TRANSIT', payload);
// });