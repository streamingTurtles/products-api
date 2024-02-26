const Redis = require('ioredis');
console.log(process.env.REDPORT);
console.log(process.env);
console.log('in redis3.js');
// Create a new Redis client
const client = new Redis({
  port: 6379,          // Redis server port
  host: '127.0.0.1',   // Redis server host
  family: 4,           // 4 (IPv4) or 6 (IPv6)
  db: 0,               // Database index to use
});


client.on('ready', () => {
    console.log('READY to Redis server');
  });


// Event handler for when the connection is established
client.on('connect', () => {
  console.log('Connected to Redis server');
});

// Event handler for any errors that occur during the connection
client.on('error', (err) => {
  console.error('Error connecting to Redis server:', err);
});

// Set a key-value pair in the Redis server
client.set('key', 'value', (err, result) => {
  if (err) {
    console.error('Error setting value:', err);
  } else {
    console.log('Value set successfully');
  }

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
});
