'use strict';

const Chance = require('chance');
const { io } = require('socket.io-client');
const createVendorPayload = require('./handleVendors');

const chance = new Chance();
const socket = io('http://localhost:3002/caps');
const sendPayload = createVendorPayload(socket);

socket.emit('JOIN', 'vendor');

socket.on('DELIVERED', (payload) => {
  console.log(`Thank you for delivering ${payload.payload.orderId}`);
});

setInterval(() => {

  const payload = {
        store: '1-206-flowers',
        orderId: chance.apple_token(),
        customer: chance.name(),
        address: chance.address(),
      }

  sendPayload(payload);
}, 5000);
