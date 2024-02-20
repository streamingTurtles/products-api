const http = require('http');
const redis = require('redis');

console.log('Running redis20.js');

// Create Redis client
const client = redis.createClient({ host: 'localhost', port: 6379 });

// Function to start the server
function startServer() {
    // Check if the client is connected
    if (!client.connected) {
        console.log('Waiting for Redis client to connect...');
        setTimeout(startServer, 1000); // Retry after 1 second
        return;
    }

    console.log('Redis client is connected');
    
    // Redis SET command to store data
    client.set('example_key', 'example_value', (err, reply) => {
        if (err) {
            console.error('Error storing data in Redis:', err);
            client.quit();
        } else {
            console.log('Data stored in Redis:', reply);

            // Start the HTTP server
            startHttpServer();
        }
    });
}

// Event handler for when the client encounters an error
client.on('error', (err) => {
    console.error('Redis client error:', err);
});

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

    // Close the Redis client when the server is closed
    server.on('close', () => {
        console.log('Closing Redis client');
        client.quit();
    });
}

// Start the server
startServer();
