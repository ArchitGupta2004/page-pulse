const env = require('../config/env');
const logger = require('../utils/logger');

let activeRequests = 0;

const concurrencyLimiter = (req, res, next) => {
  if (activeRequests >= env.CONCURRENCY_LIMIT) {
    logger.warn('Concurrency limit reached');
    return res.status(429).json({
      error: {
        message: 'Server is currently busy, please try again later.',
      },
    });
  }

  activeRequests++;

  const onFinished = () => {
    activeRequests--;
    res.removeListener('finish', onFinished);
    res.removeListener('close', onFinished);
  };

  res.on('finish', onFinished);
  res.on('close', onFinished);

  next();
};

module.exports = concurrencyLimiter;
