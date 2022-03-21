// import redis from 'redis';
const redis = require('redis');

import 'dotenv/config';

// const client = createClient({
//   port: process.env.REDIS_PORT,
//   host: process.env.REDIS_HOST,
// });

let client;
if (process.env.REDISCLOUD_URL) {
	let redisURL = process.env.REDISCLOUD_URL;
	client = redis.createClient(redisURL);
} else {
	client = redis.createClient({
		port: process.env.REDIS_PORT,
		host: process.env.REDIS_HOST,
	});
}

client.on('connect', () => {
	console.log('Client connected to redis...');
});

client.on('ready', () => {
	console.log('Client connected to redis and ready to use...');
});

client.on('error', (error) => {
	console.error(error.message);
});

client.on('end', () => {
	console.log('Client disconnected from redis');
});

client.on('SIGINT', () => {
	client.quit();
});

client.connect();

export default client;