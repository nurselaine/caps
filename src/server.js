// 'use strict';

// const express = require('express');
// // const Chance = require('chance');
// const { io } = require('socket.io-client');
// const logger = require('../src/middleware/logger');

// // const chance = new Chance();
// const app = express();
// // const io = require('socket.io').listen(app);
// const socket = io('http://localhost:3002/caps');

// const createVendorPayload = require('./clients/vendors/handleVendors');
// const sendPayload = createVendorPayload(socket);

// const PORT = 3002;

// app.use(logger);

// app.use('/', (req, res) => {
//   console.log('Hello ! Welcome to my CAPS server');
// });

// app.post('/pickup', (req, res, next) => {
//   try{
//     setInterval(() => {
//       const payload = req.body;
    
//       sendPayload(payload);
//     }, 5000);
//   }catch (e) {
//     console.log(`ERROR: ${e}`);
//   }
// });

// function start(){
//   app.listen(PORT, () => {console.log('listening on port', PORT)});
// };

// module.exports = { start };