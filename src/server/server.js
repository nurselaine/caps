'use strict';

/*
Create a Message Queue that can store payloads for specific Clients.
Each payload that is read by the pickup event should be added to a Queue for Driver clients.
Each payload that is read by the delivered event should be added to a Queue for Vendor clients.
This could be as simple as an Object or Array, or as complex as a Module that connects to and performs operations against a database.
*/


const { Server } = require('socket.io');
const eventLogger = require('../util');
const Queue = require('./lib/messageQueue');

const PORT = process.env.PORT || 3002;
const server = new Server(PORT);
const clientQueue = new Queue();
// const driverQueue = new Queue();
// const vendorQueue = new Queue();
// const vendorQueueKey = '1-206-flowers';
const driverQueueKey = 'driver';
const caps = server.of('/caps');

caps.on('connection', (socket) => {

  socket.on('JOIN', (queueId) => {
    console.log(`You've join the ${queueId} room!`);
    socket.join(queueId);
    // clientQueue.store(room, new Queue());

    // console.log(clientQueue);
  });


  socket.on('PICKUP', (payload) => {
    eventLogger(payload, 'pickup');

    let driverQueue = clientQueue.read(payload.queueId);

    if(!driverQueue){
      let queueKey = clientQueue.store(payload.queueId, new Queue()); // adding a new key and value pair to clientQueue
      // console.log(queueKey); // queue key is just the name of the vendor
      driverQueue = clientQueue.read(queueKey);
      // console.log(`clientQueue ${JSON.stringify(clientQueue)}`);
    }

    driverQueue.store(payload.messageId, payload); // this is storing key value inside of the vendor queue within the client queue

    // when a pickup event is heard, add payload to a queue for driver clients 
    // let currentClientMessageQueue = clientQueue.read(payload.queueId); 

    // if(!currentClientMessageQueue){ // if there is no <storename> queue in messageQueue then add it to queue
    //   let queueKey = clientQueue.store(queueId, new Queue());
      // let driverMessageQueue = clientQueue.read(driverQueueKey);
    // }
    // now add payload to driver queue for client
    // driverMessageQueue.store(payload.payload.messageId, payload);

    caps.emit('PICKUP', payload);
  });

  socket.on('IN-TRANSIT', (payload) => {
    eventLogger(payload, 'in-transit');
  });

  socket.on('DELIVERED', (payload) => {
    eventLogger(payload, 'delivered');
    // let queueKey = payload.payload.queueId;
    // when a delivered event is heard, add payload to a vendor queue for driver messages
    let vendorQueue = clientQueue.read(payload.payload.queueId);
    if(!vendorQueue){
      let queueKey = clientQueue.store(payload.payload.queueId, payload);
      vendorQueue = clientQueue.read(queueKey);
    }
    // console.log(`payload queue id: ${JSON.stringify(payload)}`);
    vendorQueue.store(payload.payload.messageId, payload);

    caps.to(payload.payload.queueId).emit('DELIVERED', payload);
    // socket.emit('DELIVERED', payload);
  });
  
  // add a received event to server - this event is heard once the vendor successfully reads a payload
  socket.on('RECEIVED', (payload) => {
    eventLogger(payload, 'received');
    let vendorQueue = clientQueue.read(payload.queueId);
    if(!vendorQueue){
      throw new Error('no queue created');
    }
    // console.log('payload', payload );
    let message = vendorQueue.remove(payload.messageId);
    // console.log(clientQueue.read('driver'));
    socket.to(payload.queueId).emit('RECEIVED', message);
  });
  
  // // add a getAll event to server - this event will go through each of the vendorQueues entries and broadcast them to the vendor
  socket.on('GET_ALL', (payload) => {
    let vendorQueue = clientQueue.read(payload.queueId);
  
    if(vendorQueue && vendorQueue.data){
      Object.keys(vendorQueue.data).forEach(messageId => {

        // socket.emit(payload.event, vendorQueue.read(messageId));
        socket.emit('DELIVERED', vendorQueue.read(messageId));
      });
    }
  });

});





// module.exports = { caps };