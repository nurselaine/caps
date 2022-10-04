'use strict';

const eventLogger = (payload, name) => {
  const d = new Date();
  const payloadObj = {
    event: name,
    timestamp: d,
    payload,
  }
  console.log(`EVENT: ${JSON.stringify(payloadObj)}`);
}

module.exports = eventLogger;