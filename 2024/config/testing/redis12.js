const http = require('http');
const redis = require('redis');

console.log('Running redis12.js, redis_async_await.js');

async function startServer() {
    // Create a Redis client
    const client = redis.createClient({ host: 'localhost', port: 6379 });

    // Wrap the client connection process in a promise
    await new Promise((resolve, reject) => {
        // Event handler for when the client connects to the Redis server
        client.on('connect', () => {
            console.log('Connected to Redis server');
            resolve(); // Resolve the promise when the connection is established
        });

        // Event handler for when the client encounters an error
        client.on('error', (err) => {
            console.error('Redis client error:', err);
            reject(err); // Reject the promise if an error occurs
        });
    });

    // Redis SET command to store data
    client.set('example_key', 'example_value', (err, reply) => {
        if (err) {
            console.error('Error storing data in Redis:', err);
        } else {
            console.log('Data stored in Redis:', reply);
        }
    });

    // Create an HTTP server listening on port 3003
    const server = http.createServer((req, res) => {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Hello World!\n');
        console.log('Server response sent');
    });

    // Start the HTTP server once the Redis client is connected
    server.listen(3003, () => {
        console.log('Server running at http://localhost:3003/');
    });
}

// Start the server
startServer().catch((err) => {
    console.error('Error starting server:', err);
});
