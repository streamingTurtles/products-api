require('dotenv').config();

const { promisify } = require('util');
const redis = require('ioredis');
//const redis = require('redis');

const client = redis.createClient({
    port: process.env.REDPORT
  });


// Event handler for when the connection is READY
client.on('ready', () => {
console.log('READY to Redis server');
});


// Event handler for when the connection is established
client.on('connect', () => {
  console.log('Connected to Redis server');
});

  module.exports = {
    get: promisify(client.get).bind(client),
    set: promisify(client.set).bind(client)
  };  