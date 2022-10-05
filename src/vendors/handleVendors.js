'use strict';

const Chance = require('chance');
const eventPool = require('../../eventPool');
const { io } = require('socket.io-client');

const chance = new Chance();
const socket = io('http://localhost:3002/caps');

module.exports = (socket) => (text) => {
  socket.emit('PICKUP', { text });
}





// const vendor = {};

// vendor.delivered = (payload) => {
//   setTimeout(() => {
//     const name = payload.payload.customer;
//     console.log(`VENDOR: Thank you for delivering package! Enjoy ${name}!`);
//     // event(payload);
//     const eventObj = {
//       time: Date.now().toLocaleString(),
//       payload,
//     }
//     // console.log(eventObj);
//     eventLogger(payload, 'delivered');
//   }, 1000);
// }

// vendor.pickup = (payload) => {
//   setTimeout(() => {

//     if (payload) {
//       eventLogger(payload, 'pickup');
//       eventPool.emit('PICKUP', payload);
//     }
//   }, 1000);
// };

// module.exports = vendor;

// module.exports = (storeName) => {

//   const paylaod = {
//     store: storeName,
//     orderId: chance.apple_token(),
//     customer: chance.name(),
//     address: chance.address(),
//   }

//   eventPool.emit('PICKUP', paylaod);

//   // eventPool.on('delivered', (paylaod) => {console.log(`Thank you, ${paylaod.customer}`)});

// }