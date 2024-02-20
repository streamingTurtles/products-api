
const http = require('http');
const redis = require('redis');

// Create a Redis client
const client = redis.createClient(6379);

// Create an HTTP server
const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World!\n');
});

// Event handler for when the client connects to the Redis server
client.on('connect', () => {
    console.log('Connected to Redis server');
});

// Event handler for when the client is ready to send commands
client.on('ready', () => {
    console.log('Redis client is ready to send commands');
    // Once the client is ready, start the HTTP server
    server.listen(3000, () => {
        console.log('Server running at http://localhost:3000/');
    });
});

// Event handler for when the client encounters an error
client.on('error', (err) => {
    console.error('Redis client error:', err);
});

// Start the Redis client connection
client.connect();
