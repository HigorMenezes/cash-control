const request = require('supertest');
const app = require('../../src/app');
const { Status } = require('../../src/app/models');

describe('Status - List', () => {
  it('should return property content on body when search for all status', async () => {
    const response = await request(app).get('/status');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('content');
    expect(response.body.code).toBe(200);
  });

  it('should return property content on body when search for one status', async () => {
    const response = await request(app).get('/status/100');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('content');
    expect(response.body.code).toBe(200);
  });
});

describe('Status - Create', () => {
  it('should create a new Status when send a post to endpoint /status with valid request and auth', async () => {
    const response = await request(app)
      .post('/status')
      .send({
        id: 123,
        name: '123',
        description: '123',
      })
      .auth('admin', 'admin');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('content');
    expect(response.body.code).toBe(201);
    Status.destroy({ where: response.body.content.status });
  });

  it('should not create a new Status when send a post to endpoint /status with valid request but invalid auth', async () => {
    const response = await request(app)
      .post('/status')
      .send({
        id: 123,
        name: '123',
        description: '123',
      });

    expect(response.status).toBe(200);
    expect(response.body.code).toBe(401);
  });

  it('should not create a new Status when send a post to endpoint /status with invalid request', async () => {
    const response = await request(app)
      .post('/status')
      .send({
        name: '123',
        description: '123',
      })
      .auth('admin', 'admin');

    expect(response.status).toBe(200);
    expect(response.body.code).toBe(400);
  });
});

describe('Status - edit', () => {
  it('should edit a status when valid request and auth', async () => {
    const response = await request(app)
      .patch('/status/100')
      .send({
        id: 100,
        name: 'active',
        description: 'indicates that is active',
      })
      .auth('admin', 'admin');

    expect(response.status).toBe(200);
    expect(response.body.code).toBe(200);
  });

  it('should not edit a status when invalid auth', async () => {
    const response = await request(app)
      .patch('/status/100')
      .send({
        id: 100,
        name: 'active',
        description: 'indicates that is active',
      });

    expect(response.status).toBe(200);
    expect(response.body.code).toBe(401);
  });

  it('should not edit a status when invalid request', async () => {
    const response = await request(app)
      .patch('/status/100')
      .send({
        description: 'indicates that is active',
      })
      .auth('admin', 'admin');

    expect(response.status).toBe(200);
    expect(response.body.code).toBe(400);
  });
});
