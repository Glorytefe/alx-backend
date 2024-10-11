import redis from 'redis';

const redisClient = redis.createClient();

redisClient.on('connect', () => {
  console.log('Redis client connected to the server');
  redisClient.quit();
});

redisClient.on('error', (err) => {
  console.error(`Redis client not connected to the server: ${err.message}`);
});
