// redis_example.js

const redis = require('redis');

// Create a Redis client
const client = redis.createClient(6379);

// Event handler for when the client is ready to send commands
client.on('ready', () => {
    console.log('Connected to Redis server and ready to send commands');

    // Example usage: set a key-value pair
    client.set('key', 'value', (err, reply) => {
        if (err) {
            console.error('Error setting value:', err);
        } else {
            console.log('Set key-value pair:', reply);

            // Example usage: get the value of a key
            client.get('key', (err, value) => {
                if (err) {
                    console.error('Error getting value:', err);
                } else {
                    console.log('Retrieved value:', value);

                    // End the connection to the Redis server
                    client.quit(() => {
                        console.log('Connection closed');
                    });
                }
            });
        }
    });
});

// Event handler for when the client encounters an error
client.on('error', (err) => {
    console.error('Redis client error:', err);
});

// Keep the script running for a while to allow events to occur
setTimeout(() => {
    console.log('Script finished');
}, 5000); // 5000 milliseconds (5 seconds)
