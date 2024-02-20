require('dotenv').config();
// node deprecated
//const { promisify } = require('util');
const redis = require('redis');

console.log('Running redis.js file');


const client = redis.createClient({
    port: process.env.REDPORT
  });


  module.exports = {
    get: client.get,
    set: client.set
  };


// module.exports = {
//     get: promisify(client.get).bind(client),
//     set: promisify(client.set).bind(client)
//   };