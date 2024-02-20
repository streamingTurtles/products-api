const http = require('http');
const redis = require('redis');

console.log('Running redis21.js');


redis.debug_mode = true;
// Create Redis client
const client = redis.createClient({ host: 'localhost', port: 6379 });

// Event handler for when the client is connecting
client.on('connecting', () => {
    console.log('Redis client is connecting...');
});

// Event handler for when the client connects successfully
client.on('connect', () => {
    console.log('Redis client connected successfully');
    startServer();
});

// Event handler for when the client encounters an error
client.on('error', (err) => {
    console.error('Redis client error:', err);
    client.quit();
});

// Function to start the HTTP server
function startServer() {
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

    // Close the Redis client when the server is closed
    server.on('close', () => {
        console.log('Closing Redis client');
        client.quit();
    });
}
