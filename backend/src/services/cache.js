'use strict';

const Redis = require('ioredis');

let client = null;

function getRedisClient() {
  if (client) return client;
  const url = process.env.REDIS_URL;
  if (!url) return null;
  client = new Redis(url, { lazyConnect: true, maxRetriesPerRequest: 2 });
  client.on('error', () => {});
  return client;
}

async function cacheGet(key) {
  const redis = getRedisClient();
  if (!redis) return null;
  try {
    return await redis.get(key);
  } catch (_) {
    return null;
  }
}

async function cacheSet(key, value, ttlSeconds = 3600) {
  const redis = getRedisClient();
  if (!redis) return false;
  try {
    await redis.set(key, value, 'EX', ttlSeconds);
    return true;
  } catch (_) {
    return false;
  }
}

module.exports = { cacheGet, cacheSet };


