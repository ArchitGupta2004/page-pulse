require('dotenv').config();

const env = {
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  CACHE_TTL: parseInt(process.env.CACHE_TTL, 10) || 60, // in seconds
  RATE_LIMIT_WINDOW_MS: parseInt(process.env.RATE_LIMIT_WINDOW_MS, 10) || 900000,
  RATE_LIMIT_MAX: parseInt(process.env.RATE_LIMIT_MAX, 10) || 100,
  CONCURRENCY_LIMIT: parseInt(process.env.CONCURRENCY_LIMIT, 10) || 50,
  FETCH_TIMEOUT_MS: parseInt(process.env.FETCH_TIMEOUT_MS, 10) || 5000,
};

module.exports = env;
