//const redis = require('redis');
const redis = require('ioredis');
redisClient = redis.createClient(6379, '127.0.0.1');

const REDIS_USER_DATA_INDEX = 2;

redisClient.select(REDIS_USER_DATA_INDEX);

redisClient.on('connect', function () {
    console.log('redis connected');
    console.log(`connected ${redisClient.connected}`);
}).on('error', function (error) {
    console.log(error);
});