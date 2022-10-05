'use strict';

module.exports = (req, res ,next) => {
  console.log(`REQ ${req.method} STATUS ${res.statusCode}`)

  next();
}