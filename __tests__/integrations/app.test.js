const request = require('supertest');
const app = require('../../src/app');

describe('Test server', () => {
  it('should return status 200 when try access / route', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
  });
});
