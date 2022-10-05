'use strict';

/*
  listen for a pickup event from eventPool and response with: 
    - Log a message to the console: DRIVER: picked up <ORDER_ID>.
    - Emit an ‘in-transit’ event to the Global Event Pool with the order payload.
    - Log a confirmation message to the console: DRIVER: delievered <ORDER_ID>.
    - Emit a ‘delivered` event to the Global Event Pool with the order payload.
*/

module.exports = (socket) => (payload) => {
  const orderId = payload.payload.orderId;
  console.log('driver pick up now emitting delivered')
  console.log(`DRIVER: picked up your package! ${orderId}`);
  socket.emit('DELIVERED', payload);
}

// let eventPool = require('../../eventPool');
// const eventLogger = require('../util');



// const driver = {};

// eventPool.on('pickup', () => {console.log(`DRIVER: picked up ${payload.orderId}`);});
// eventPool.on('delivered', () => {console.log(`DRIVER: delivered ${payload.orderId}`);});

// driver.pickup = (payload) => {
//   setTimeout(() => {
//     if(payload){
//       const orderId = payload.payload.orderId;
//       console.log(`DRIVER: picked up your package! ${orderId}`);
//       const eventObj = {
//         event: 'in-transit',
//         time: Date.now(),
//         payload,
//       }
//       // console.log(eventObj);
//       eventLogger(payload, 'in-transit');

//       eventPool.emit('IN-TRANSIT', payload);
//     }
//   }, 1000)
// }

// driver.delivered = (payload) => {
//   setTimeout(() => {
//     if(payload){
//       const orderId = payload.payload.orderId;
//       console.log(`DRIVER: delivered package successfully! ${orderId}`);
//       eventPool.emit('DELIVERED', payload);
//     }
//   }, 1000)
// }

// module.exports = driver;

// module.exports = (payload) => {
//   eventPool.emit('DELIVERED', (payload) => console.log(payload));
// }