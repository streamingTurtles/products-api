const redis = require('redis');
console.log('Running redis.js');


const client = redis.createClient({
    port: 6379,
    retry_strategy: (options) => {
      console.log('Retry attempt:', options.attempt);
      // Stop retrying after a certain number of attempts
      if (options.error && options.attempt > 5) {
        console.error('Max retry attempts reached');
        return undefined; // Stop retrying
      }
      // Reconnect after a delay (in milliseconds)
      return Math.min(options.attempt * 100, 3000); // Exponential backoff with max delay of 3 seconds
    }
  });
  