/*
As a vendor, I want to alert the system when I have a package to be picked up.
As a driver, I want to be notified when there is a package to be delivered.
As a driver, I want to alert the system when I have picked up a package and it is in transit.
As a driver, I want to alert the system when a package has been delivered.
As a vendor, I want to be notified when my package has been delivered.

As a developer, I want to create network event driven system using Socket.io 
so that I can write code that responds to events originating from both servers and
client applications


he goal of this lab is to create a namespaced Socket.io event server, and to configure Vendor and Driver Client Modules.

The Socket Server will create a namespace of caps that will receive all CAPS event traffic.
Each Vendor and Driver Client will connect to the caps namespace.
The server will emit specific events to each socket that is listening for their designated events from the Global Event Pool defined in the Server.
Each Vendor will only emit and listen for specific events based on their Vendor ID. This will be managed by rooms within Socket.io.
Each Driver will “pick up” a package when the vendor notifies the Server that an “order” is ready and simulate “in-transit” and “delivered” events.

Data flow:
- vendow notifies server "order" is ready
- Driver will PICKUP
- IN-TRANSIT triggered
- DELIVERED triggered
- ?VENDOR DELIVERED (Thank you message?)

*/ 

// this module will manage events and listen to ALL event in event pool
// console.log a timestamp and payload for every event
'use strict';
const Chance = require('chance');
const chance = new Chance();
const { Server } = require('socket.io');
const eventLogger = require('../util');

const PORT = process.env.PORT || 3002;
const server = new Server(PORT);

const driverHandler = require('../drivers/handlerDrivers');
const vendorHandler = require('../vendors/handleVendors');

const caps = server.of('/caps'); // this is my namespace that will recieve all CAPS event traffic

caps.on('connection', (socket) => {

  // Each Vendor will only emit and listen for specific events based on their Vendor ID. This will be managed by rooms within Socket.io.
  socket.on('JOIN', (room) => {
    console.log(`You've join the ${room} room!`);
  });

  socket.on('PICKUP', (payload) => {
    eventLogger(payload, 'pickup');
    console.log('going to driver pick up event')
    caps.emit('DRIVER_PICKUP', payload);
    console.log('after driver pickup');
  })

  socket.on('DELIVERED', (payload) => {
    console.log('driver delivered');
    eventLogger(payload, 'delivered');
    caps.emit('DELIVERED')
  })

});


// server.on('connection', (socket) => {
//   console.log('Socket connected to Global Event Server', socket.id);

//   socket.on('VENDOR_PICKUP', (payload) => {
//     console.log(`Server PICKUP `)

//     socket.broadcast.emit('VENDOR_PICKUP', payload);
//   });

//   socket.on('PICKUP', driverHandler.pickup);
// })


// .on() is used to listen for an event
// eventPool.on('VENDOR_PICKUP', vendorHandler.pickup);
// eventPool.on('PICKUP', driverHandler.pickup);
// eventPool.on('IN-TRANSIT', driverHandler.delivered);
// eventPool.on('DELIVERED', vendorHandler.delivered);
// eventPool.on('*', event);

// setInterval(() => {
//   console.log(`"""""""""""""""" INTERVAL """""""""""""""""""""`);

//   const payload = {
//     store: chance.company(),
//     orderId: chance.apple_token(),
//     customer: chance.name(),
//     address: chance.address(),
//   };
//   eventPool.emit('VENDOR_PICKUP', { payload });

// }, 5000);
