// minimal_redis_example.js

const redis = require('redis');

// Create a Redis client
const client = redis.createClient(6379);

// Event handler for when the client connects to the Redis server
client.on('connect', () => {
    console.log('Connected to Redis server');
});

// Event handler for when the client encounters an error
client.on('error', (err) => {
    console.error('Redis client error:', err);
});
