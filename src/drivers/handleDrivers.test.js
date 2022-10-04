'use strict';

const handleDrivers = require('./handlerDrivers');
const eventPool = require('../../eventPool');

// mock event pool : 2 params, 
// first module/object to mock. 
// Second callback that return object because eventPool is an object with two methods
jest.mock(eventPool, () => {
  return {
    on: jest.fn(),
    emit: jest.fn(),
  }
});

const paylaod = {store: "test", orderId: '123', customer: "Hello", address: "1234 st now"};

describe('Handle Drivers Test', () => {
  console.log = jest.fn();

  it('Log an emit PICKUP event', () => {
    handleDrivers.pickup(paylaod);
    expect(console.log).toHaveBeenCalledWith(`DRIVER: picked up your package! id: ${paylaod}`);
    expect(eventPool.emit).toHaveBeenCalledWith('PICKUP');
  });

  it('Log an emit IN-TRANSIT event to trigger Delivered event', () => {
    handleDrivers.delivered(paylaod);

    expect(eventPool.emit).toHaveBeenCalledWith(`DELIVERED`);
    expect(console.log).toHaveBeenCalledWith('DRIVER: delivered package successfully! id: ${payload}');
  });
})