import { createClient } from "redis";

import 'dotenv/config'

const client = createClient({
    port: process.env.REDIS_PORT,
    host: process.env.REDIS_HOST
})

client.on('connect', () => {
    console.log('Client connected to redis...')
})

client.on('ready', () => {
    console.log('Client connected to redis and ready to use...')
})


client.on('error', error => {
    console.log(error.message);
})

client.on('end', () => {
    console.log('Client disconnected from redis');
})

client.on('SIGINT', () => {
    client.quit()
})

client.connect()

export default client