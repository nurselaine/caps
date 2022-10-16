// 'use strict';

// const Chance = require('chance');
// const MessageClient = require('../lib/MessageClient');

// const chance = new Chance();
// const vendorName = 'acme-widgets';
// const messenger = new MessageClient(vendorName);

// messenger.publish('GET_ALL', { queueId: vendorName, event: 'RECEIVED'});

// messenger.subscribe('DELIVERED', (payload) => {
//   // console.log('im an in vendor thank you message');
//   console.log(`Thank you for delivering ${payload.payload.orderId}`);
// // emit a RECEIVED event 
//   messenger.publish('RECEIVED', payload);
// });

// setInterval(() => {

//   const payload = {
//         store: vendorName,
//         queueId: vendorName,
//         orderId: chance.apple_token(),
//         customer: chance.name(),
//         address: chance.address(),
//         messageId: chance.guid(),
//       }
//     messenger.publish('PICKUP', {messageId: chance.guid(), payload})
//   // sendPayload(payload);
// }, 5000);
