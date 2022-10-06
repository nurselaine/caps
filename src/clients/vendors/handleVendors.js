'use strict';

module.exports = (socket) => (payload) => {
  messenger.publish('PICKUP', { payload });
};