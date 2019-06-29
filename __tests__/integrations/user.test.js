const request = require('supertest');
const app = require('../../src/app');
const { User } = require('../../src/app/models');

describe('User - List', () => {
  it('should return property content on body when search for all users', async () => {
    const response = await request(app).get('/users');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('content');
    expect(response.body.code).toBe(200);
  });

  it('should return property content on body when search for one user', async () => {
    const response = await request(app).get('/users/1');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('content');
    expect(response.body.code).toBe(200);
  });
});

describe('User - Create', () => {
  it('should create a new User when send a post to endpoint /users with valid request and auth', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        name: 'Higor',
        lastName: 'Menezes',
        email: 'higor@menezes.com',
        password: '123',
        statusId: 100,
      })
      .auth('admin', 'admin');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('content');
    expect(response.body.code).toBe(201);
    User.destroy({ where: { id: response.body.content.users.id } });
  });

  it('should not create a new User when send a post to endpoint /users with valid request but invalid auth', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        name: 'Higor',
        lastName: 'Menezes',
        email: 'higor@menezes.com',
        password: '123',
        statusId: 100,
      });

    expect(response.status).toBe(200);
    expect(response.body.code).toBe(401);
  });

  it('should not create a new User when send a post to endpoint /users with invalid request', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        name: 'Higor',
        lastName: 'Menezes',
        password: '123',
        statusId: 100,
      })
      .auth('admin', 'admin');

    expect(response.status).toBe(200);
    expect(response.body.code).toBe(400);
  });
});

describe('User - edit', () => {
  it('should edit a user when valid request and auth', async () => {
    const response = await request(app)
      .patch('/users/1')
      .send({
        name: 'Higor',
        lastName: 'Menezes',
        email: 'higor@aparecido.com',
        password: '123',
        statusId: 300,
      })
      .auth('admin', 'admin');

    expect(response.status).toBe(200);
    expect(response.body.code).toBe(200);
  });

  it('should not edit a user when invalid auth', async () => {
    const response = await request(app)
      .patch('/users/1')
      .send({
        name: 'Higor',
        lastName: 'Menezes',
        email: 'higor@aparecido.com',
        password: '123',
        statusId: 100,
      });

    expect(response.status).toBe(200);
    expect(response.body.code).toBe(401);
  });

  it('should not edit a user when invalid request', async () => {
    const response = await request(app)
      .patch('/users/1')
      .send({
        name: 'Higor',
        lastName: 'Menezes',
        email: 'higor@aparecido.com',
        password: '123',
      })
      .auth('admin', 'admin');

    expect(response.status).toBe(200);
    expect(response.body.code).toBe(400);
  });
});
