const axios = require('axios');
const cheerio = require('cheerio');
const env = require('../config/env');
const logger = require('../utils/logger');

const fetchUrlInfo = async (url) => {
  const startTime = Date.now();
  
  try {
    const response = await axios.get(url, {
      timeout: env.FETCH_TIMEOUT_MS,
      maxRedirects: 5,
      validateStatus: () => true, // resolve on any status code to capture it
      headers: {
        'User-Agent': 'URLAuditService/1.0',
      }
    });

    const responseTime = Date.now() - startTime;
    const finalUrl = response.request?.res?.responseUrl || url;
    let title = null;

    // Check if the response is HTML
    const contentType = response.headers['content-type'] || '';
    if (contentType.includes('text/html') && response.data) {
      const $ = cheerio.load(response.data);
      title = $('title').text().trim() || null;
    }

    return {
      statusCode: response.status,
      responseTime,
      title,
      finalUrl,
    };
  } catch (error) {
    const responseTime = Date.now() - startTime;
    logger.error({ err: error, url }, 'Error fetching URL');
    
    // Determine the error type
    if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
      throw { statusCode: 504, message: 'URL fetch timed out', isOperational: true };
    }
    
    throw { statusCode: 400, message: `Failed to fetch URL: ${error.message}`, isOperational: true };
  }
};

module.exports = {
  fetchUrlInfo,
};
