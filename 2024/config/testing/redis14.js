const http = require('http');
const redis = require('redis');

console.log('Running redis14.js - redis_async_await.js');

// Function to establish Redis client connection
function connectToRedis() {
    return new Promise((resolve, reject) => {
        const client = redis.createClient({ host: 'localhost', port: 6379 });

        client.on('connect', () => {
            console.log('Connected to Redis server');
            resolve(client);
        });

        client.on('error', (err) => {
            console.error('Redis client error:', err);
            reject(err);
        });
    });
}

// Async function to start the server
async function startServer() {
    try {
        // Establish Redis client connection
        const client = await connectToRedis();

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
