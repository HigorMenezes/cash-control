const request = require('supertest');
const app = require('../../src/app');
const { User } = require('../../src/app/models');
const factory = require('../factories');

describe('User - List', () => {
  it('should return property content on body when search for all users', async () => {
    const user = await factory.create('User');
    const response = await request(app).get('/users');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('content');
    expect(response.body.code).toBe(200);
    await User.destroy({ where: { id: user.id } });
  });

  it('should return property content on body when search for one user', async () => {
    const user = await factory.create('User');
    const response = await request(app).get(`/users/${user.id}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('content');
    expect(response.body.code).toBe(200);
    await User.destroy({ where: { id: user.id } });
  });
});

describe('User - Create', () => {
  it('should create a new User when send a post to endpoint /users with valid request and auth', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        name: 'Higor',
        lastName: 'Menezes',
        email: 'higor@2menezes.com',
        password: '123',
        statusId: 100,
      })
      .auth('admin', 'admin');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('content');
    expect(response.body.code).toBe(201);
    if (response.body && response.body.users && response.body.users.id) {
      await User.destroy({ where: { id: response.body.users.id } });
    }
  });

  it('should not create a new User when send a post to endpoint /users with valid request but invalid auth', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        name: 'Higor',
        lastName: 'Menezes',
        email: 'higor.menezes@2.com',
        password: '123',
        statusId: 100,
      });

    expect(response.status).toBe(200);
    expect(response.body.code).toBe(401);
    if (response.body && response.body.users && response.body.users.id) {
      await User.destroy({ where: { id: response.body.users.id } });
    }
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
    if (response.body && response.body.users && response.body.users.id) {
      await User.destroy({ where: { id: response.body.users.id } });
    }
  });
});

describe('User - edit', () => {
  it('should edit a user when valid request and auth', async () => {
    const user = await factory.create('User');
    const response = await request(app)
      .patch(`/users/${user.id}`)
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
    await User.destroy({ where: { id: user.id } });
  });

  it('should not edit a user when invalid auth', async () => {
    const user = await factory.create('User');
    const response = await request(app)
      .patch(`/users/${user.id}`)
      .send({
        name: 'Higor',
        lastName: 'Menezes',
        email: 'higor@aparecido.com',
        password: '123',
        statusId: 100,
      });

    expect(response.status).toBe(200);
    expect(response.body.code).toBe(401);
    await User.destroy({ where: { id: user.id } });
  });

  it('should not edit a user when invalid request', async () => {
    const user = await factory.create('User');
    const response = await request(app)
      .patch(`/users/${user.id}`)
      .send({
        name: 'Higor',
        lastName: 'Menezes',
        email: 'higor@aparecido.com',
        password: '123',
      })
      .auth('admin', 'admin');

    expect(response.status).toBe(200);
    expect(response.body.code).toBe(400);
    await User.destroy({ where: { id: user.id } });
  });
});
