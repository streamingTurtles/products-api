const http = require('http');
const redis = require('redis');
const { promisify } = require('util');

console.log('Running redis15.js - redis_async_await.js');

// Promisify redis.createClient
const createClientAsync = promisify(redis.createClient);

async function startServer() {
    try {
        // Create Redis client asynchronously
        const client = await createClientAsync({ host: 'localhost', port: 6379 });

        // Redis SET command to store data
        client.set('example_key', 'example_value', (err, reply) => {
            if (err) {
                console.error('Error storing data in Redis:', err);
            } else {
                console.log('Data stored in Redis:', reply);
            }
        });

        // Event handler for when the client connects to the Redis server
        client.on('connect', () => {
            console.log('Connected to Redis server');
        });

        // Event handler for when the client encounters an error
        client.on('error', (err) => {
            console.error('Redis client error:', err);
        });

        // Create an HTTP server listening on port 3003
        const server = http.createServer((req, res) => {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Hello World!\n');
            console.log('Server response sent');
        });

        // Start the HTTP server
        server.listen(3003, () => {
            console.log('Server running at http://localhost:3003/');
        });
    } catch (err) {
        console.error('Error starting server:', err);
    }
}

// Start the server
startServer();
