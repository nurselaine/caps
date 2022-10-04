'use strict';

/*
  listen for a pickup event from eventPool and response with: 
    - Log a message to the console: DRIVER: picked up <ORDER_ID>.
    - Emit an ‘in-transit’ event to the Global Event Pool with the order payload.
    - Log a confirmation message to the console: DRIVER: delievered <ORDER_ID>.
    - Emit a ‘delivered` event to the Global Event Pool with the order payload.
*/

let eventPool = require('../../eventPool');
// const { event } = require('../server');

const driver = {};

// eventPool.on('pickup', () => {console.log(`DRIVER: picked up ${payload.orderId}`);});
// eventPool.on('delivered', () => {console.log(`DRIVER: delivered ${payload.orderId}`);});

driver.pickup = (payload) => {
  setTimeout(() => {
    if(payload){
      console.log(`DRIVER: picked up your package! id: ${payload}`);
      const eventObj = {
        event: 'in-transit',
        time: Date.now(),
        payload,
      }
      console.log(eventObj);

      eventPool.emit('IN-TRANSIT', payload);
    }
  }, 1000)
}

driver.delivered = (payload) => {
  setTimeout(() => {
    if(payload){
      console.log(`DRIVER: delivered package successfully! id: ${payload}`);
      eventPool.emit('DELIVERED', payload);
    }
  }, 1000)
}

module.exports = driver;

// module.exports = (payload) => {
//   eventPool.emit('DELIVERED', (payload) => console.log(payload));
// }