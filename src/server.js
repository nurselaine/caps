/*
As a vendor, I want to alert the system when I have a package to be picked up.
As a driver, I want to be notified when there is a package to be delivered.
As a driver, I want to alert the system when I have picked up a package and it is in transit.
As a driver, I want to alert the system when a package has been delivered.
As a vendor, I want to be notified when my package has been delivered.

As a developer, I want to use industry standards for managing the state of each package.
As a developer, I want to create an event driven system so that I can write code that happens in response to events, in real time.

*/ 

// this module will manage events and listen to ALL event in event pool
// console.log a timestamp and payload for every event
'use strict';
const Chance = require('chance');
const chance = new Chance();
const eventPool = require('../eventPool');

const driverHandler = require('./drivers/handlerDrivers');
const vendorHandler = require('./vendors/handleVendors');

// .on() is used to listen for an event
eventPool.on('VENDOR_PICKUP', vendorHandler.pickup);
eventPool.on('PICKUP', driverHandler.pickup);
eventPool.on('IN-TRANSIT', driverHandler.delivered);
eventPool.on('DELIVERED', vendorHandler.delivered);
// eventPool.on('*', event);

setInterval(() => {
  console.log(`"""""""""""""""" INTERVAL """""""""""""""""""""`);

  const payload = {
    store: chance.company(),
    orderId: chance.apple_token(),
    customer: chance.name(),
    address: chance.address(),
  };
  eventPool.emit('VENDOR_PICKUP', { payload });

}, 5000);


// module.exports = { event };