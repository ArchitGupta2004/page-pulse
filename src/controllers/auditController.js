const NodeCache = require('node-cache');
const env = require('../config/env');
const urlService = require('../services/urlService');
const logger = require('../utils/logger');

const cache = new NodeCache({ stdTTL: env.CACHE_TTL, checkperiod: env.CACHE_TTL * 0.2 });

const auditUrl = async (req, res, next) => {
  const startTime = Date.now();
  try {
    const { url } = req.body;

    const cachedResult = cache.get(url);
    if (cachedResult) {
      logger.info({ url }, 'Cache hit');
      const responseTime = Date.now() - startTime;
      return res.status(200).json({
        cached: true,
        data: {
          ...cachedResult,
          responseTime,
        },
      });
    }
    const result = await urlService.fetchUrlInfo(url);

    cache.set(url, result);
    logger.info({ url }, 'Cache miss, result saved');

    return res.status(200).json({
      cached: false,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  auditUrl,
};
