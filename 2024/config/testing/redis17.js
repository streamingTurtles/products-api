const http = require('http');
const redis = require('redis');

console.log('Running redis17.js using callbacks');

// Function to start the server
function startServer() {
    // Create Redis client
    const client = redis.createClient({ host: 'localhost', port: 6379 });

    // Event handler for when the client connects to the Redis server
    client.on('connect', () => {
        console.log('Connected to Redis server');

        // Redis SET command to store data
        client.set('example_key', 'example_value', (err, reply) => {
            if (err) {
                console.error('Error storing data in Redis:', err);
            } else {
                console.log('Data stored in Redis:', reply);

                // Start HTTP server after data is stored
                startHttpServer(client);
            }
        });
    });

    // Event handler for when the client encounters an error
    client.on('error', (err) => {
        console.error('Redis client error:', err);
    });
}

// Function to start the HTTP server
function startHttpServer(client) {
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
