const request = require('supertest');
const app = require('../src/app');
const env = require('../src/config/env');

// Mock urlService to avoid actual HTTP requests
jest.mock('../src/services/urlService', () => ({
  fetchUrlInfo: jest.fn().mockImplementation(async (url) => {
    if (url === 'https://example.com') {
      return {
        statusCode: 200,
        responseTime: 100,
        title: 'Example Domain',
        finalUrl: 'https://example.com'
      };
    }
    if (url === 'https://slow.com') {
      return new Promise((resolve) => setTimeout(() => resolve({
        statusCode: 200,
        responseTime: 500,
        title: 'Slow Domain',
        finalUrl: 'https://slow.com'
      }), 50));
    }
    if (url === 'https://timeout.com') {
      throw { statusCode: 504, message: 'URL fetch timed out', isOperational: true };
    }
    throw { statusCode: 400, message: 'Failed to fetch URL', isOperational: true };
  })
}));

describe('POST /api/audit', () => {
  it('should return 400 if url is missing', async () => {
    const res = await request(app)
      .post('/api/audit')
      .send({});
    
    expect(res.statusCode).toEqual(400);
    expect(res.body.error).toBeDefined();
    expect(res.body.error.message).toContain('"url" is required');
  });

  it('should return 400 if url is invalid', async () => {
    const res = await request(app)
      .post('/api/audit')
      .send({ url: 'not-a-url' });
    
    expect(res.statusCode).toEqual(400);
    expect(res.body.error).toBeDefined();
    expect(res.body.error.message).toContain('"url" must be a valid URI');
  });

  it('should return URL info on success', async () => {
    const res = await request(app)
      .post('/api/audit')
      .send({ url: 'https://example.com' });
    
    expect(res.statusCode).toEqual(200);
    expect(res.body.data).toBeDefined();
    expect(res.body.data.statusCode).toEqual(200);
    expect(res.body.data.title).toEqual('Example Domain');
    expect(res.body.cached).toEqual(false);
  });
  
  it('should return from cache on subsequent request', async () => {
    const res = await request(app)
      .post('/api/audit')
      .send({ url: 'https://example.com' });
    
    expect(res.statusCode).toEqual(200);
    expect(res.body.cached).toEqual(true);
  });

  it('should handle fetch timeouts', async () => {
    const res = await request(app)
      .post('/api/audit')
      .send({ url: 'https://timeout.com' });
    
    expect(res.statusCode).toEqual(504);
    expect(res.body.error.message).toEqual('URL fetch timed out');
  });

  it('should enforce concurrency limits', async () => {
    const originalLimit = env.CONCURRENCY_LIMIT;
    env.CONCURRENCY_LIMIT = 2; // Allow max 2 concurrent requests

    // Fire 3 simultaneous slow requests
    const promises = [
      request(app).post('/api/audit').send({ url: 'https://slow.com' }),
      request(app).post('/api/audit').send({ url: 'https://slow.com' }),
      request(app).post('/api/audit').send({ url: 'https://slow.com' })
    ];

    const results = await Promise.all(promises);

    // Two should pass (200) and one should be rejected (429)
    const statusCodes = results.map(r => r.statusCode).sort();
    
    expect(statusCodes).toEqual([200, 200, 429]);
    
    const rejected = results.find(r => r.statusCode === 429);
    expect(rejected.body.error.message).toEqual('Server is currently busy, please try again later.');

    // Restore limit
    env.CONCURRENCY_LIMIT = originalLimit;
  });
});
