'use strict';

const handleVendors = require('./handleVendors');
const eventPool = require('../../eventPool');

// mock event pool : 2 params, 
// first module/object to mock. 
// Second callback that return object because eventPool is an object with two methods
jest.mock('../../eventPool', () => {
  return {
    on: jest.fn(),
    emit: jest.fn(),
  }
});

describe('Handle Drivers Test', () => {
  console.log = jest.fn();

  it('Log an emit PICKUP event', () => {
    const paylaod = {store: "test", orderId: '123', customer: "Hello", address: "1234 st now"}
    eventPool.on('PICKUP', handleVendors.pickup);

    eventPool.emit('PICKUP', paylaod);
  
    expect(console.log).toHaveBeenCalledWith(`VENDOR: Thank you for delivering package! Enjoy ${paylaod.customer}!`);
  });

})