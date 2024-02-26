
require('dotenv').config();
const { promisify } = require('util');
const redis = require('redis');  // using redis v3.1.2



const client = redis.createClient({
  port: process.env.REDPORT
});

console.log(process.env)


  client.on('ready', () => {
    console.log('I guess I am READY to Redis server now');
    });

  client.on("error", (error) => console.error(`Error : ${error}`));



module.exports = {
  get: promisify(client.get).bind(client),
  set: promisify(client.set).bind(client)

}



