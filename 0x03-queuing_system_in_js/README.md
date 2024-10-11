# 0x03. Queuing System in JS.

## Learning Objectives
At the end of this project, you are expected to be able to explain to anyone, without the help of Google:

- How to run a Redis server on your machine
- How to run simple operations with the Redis client
- How to use a Redis client with Node JS for basic operations
- How to store hash values in Redis
- How to deal with async operations with Redis
- How to use Kue as a queue system
- How to build a basic Express app interacting with a Redis server
- How to the build a basic Express app interacting with a Redis server and queue

## Install a redis instance
- Download, extract, and compile the latest stable Redis version (higher than 5.0.7 - https://redis.io/downloads/)

      wget http://download.redis.io/releases/redis-6.0.10.tar.gz


# Start Redis.
```
src/redis-server &
```

# Ping redis server.
```
src/redis-cli ping
```

# Enter Redis client.
``` 
redis-cli 
```

# Kill redis server
```
ps aux | grep redis-server
kill <PID_OF_Redis_Server>
```
