const http = require('http');
const redis = require('redis');

console.log('Running redis16.js using callbacks');

// Function to start the server
function startServer() {
    // Create Redis client
    const client = redis.createClient({ host: 'localhost', port: 6379 });

    // Redis SET command to store data
    client.set('example_key', 'example_value', (err, reply) => {
        if (err) {
            console.error('Error storing data in Redis:', err);
        } else {
            console.log('Data stored in Redis:', reply);

            // Start HTTP server after data is stored and client is connected
            startHttpServer();
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
}

// Function to start the HTTP server
function startHttpServer() {
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
}

// Start the server
startServer();
