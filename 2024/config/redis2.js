const redis = require('redis');

// Create a Redis client
const client = redis.createClient({
  port: 6379, // Redis server port
  host: '127.0.0.1', // Redis server host
});

// Event handler for when the client connects successfully
client.on('ready', () => {
  console.log('Connected to Redis server');

  // Perform operations on the Redis server
  // For example, set a key-value pair
  client.set('key', 'value', (err, reply) => {
    if (err) {
      console.error('Error setting value:', err);
    } else {
      console.log('Value set successfully');

      // Retrieve the value for the key
      client.get('key', (err, value) => {
        if (err) {
          console.error('Error getting value:', err);
        } else {
          console.log('Retrieved value:', value);
        }

        // Close the connection to the Redis server
        client.quit(() => {
          console.log('Disconnected from Redis server');
        });
      });
    }
  });
});

// Event handler for any errors that occur during the connection
client.on('error', (err) => {
  console.error('Error connecting to Redis server:', err);
});
