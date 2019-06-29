const request = require('supertest');
const app = require('../../src/app');
const { User } = require('../../src/app/models');

describe('Session - store', () => {
  beforeEach(async () => {
    await User.destroy({ truncate: true });
  });

  it('should authenticate with valid credentials', async () => {
    const user = await User.create({
      name: 'Higor',
      lastName: 'Menezes',
      email: 'higor@menezes.com',
      password: '123',
      statusId: 100,
    });

    const response = await request(app)
      .post('/session')
      .send({ email: user.email, password: '123' });
    expect(response.status).toBe(200);
    expect(response.body.code).toBe(200);
    expect(response.body.content).toHaveProperty('token');
  });

  it('should not authenticate without credentials', async () => {
    const user = await User.create({
      name: 'Higor',
      lastName: 'Menezes',
      email: 'higor@menezes.com',
      password: '123',
      statusId: 100,
    });

    const response = await request(app)
      .post('/session')
      .send({ email: user.email });

    expect(response.status).toBe(200);
    expect(response.body.code).toBe(400);
  });

  it('should not authenticate with invalid credentials, password incorrect', async () => {
    const user = await User.create({
      name: 'Higor',
      lastName: 'Menezes',
      email: 'higor@menezes.com',
      password: '123',
      statusId: 100,
    });

    const response = await request(app)
      .post('/session')
      .send({ email: user.email, password: '1234' });

    expect(response.status).toBe(200);
    expect(response.body.code).toBe(401);
  });

  it('should not authenticate with invalid credentials, email incorrect', async () => {
    const user = await User.create({
      name: 'Higor',
      lastName: 'Menezes',
      email: 'higor@menezes.com',
      password: '123',
      statusId: 100,
    });

    const response = await request(app)
      .post('/session')
      .send({ email: 'higor@menezes.com.br', password: user.password });

    expect(response.status).toBe(200);
    expect(response.body.code).toBe(404);
  });
});
