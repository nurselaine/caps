'use strict';

// export a function that takes in a parameter representing a store name
// when triggered, a pickup event should occur for the given store name
// emit pickup to global event pool in server.js
// sends vendor order paylaod 
/*
payload: {
  "store": "<store-name>",
  "orderId": "<unique-order-id>",
  "customer": "<customer-name>",
  "address": "<city-state>",
}
use the change library to make up phony information
*/
// this should also listen/subscribe to a delivered event and response by logging message to console
// log: Thank you, <customer name>

const Chance = require('chance');
const eventPool = require('../../eventPool');
const { event } = require('../server');

const vendor = {};

vendor.delivered = (payload) => {
  setTimeout(() => {
    console.log(`VENDOR: Thank you for delivering package! customer name ${payload}`);
    // event(payload);
    const eventObj = {
      time: Date.now().toLocaleString(),
      payload,
    }
    console.log(eventObj);
  }, 1000);
}

// vendor.pickup = (payload) => {
//   setTimeout(() => {

//     if (payload) {
//       const time = Date.now();
//       const eventObj = {
//         time: time.toLocaleString(),
//         payload,
//       };
//       // console.log(`EVENT { event: \'pickup\', ${JSON.stringify(eventObj)}}`)
//       eventPool.emit('PICKUP', payload);
//       event(payload, 'pickup');
//     }
//   }, 1000);
// }

module.exports = vendor;

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