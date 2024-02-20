
// this is a test file to test async/await with redis
// seems to work so far the best
// still not seeing redisClient.on events
// https://www.youtube.com/watch?v=vvT6Zx7Ae2I

require('dotenv').config();
const http = require('http');
const redis = require('redis');

//const { promisify } = require('util');

console.log('Running redis22.js - redis_async_await.js');


(async () => {
    // client = redis.createClient({
    //     host: 'localhost',
    //     port: 6379
    // });

    client = redis.createClient();

    client.on('connect', () => {
        console.log('Connected to Redis server');
    });

    client.on('error', (err) => {
        console.error(`Redis client error: ${err}`);
    });

})();






module.exports = {
    get: client.get,
    set: client.set
  };


