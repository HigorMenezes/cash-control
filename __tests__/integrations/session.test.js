const request = require('supertest');
const app = require('../../src/app');
const factory = require('../factories');
const { User } = require('../../src/app/models');

describe('Session - store', () => {
  it('should authenticate with valid credentials', async () => {
    const user = await factory.create('User', {
      password: '123',
    });

    const response = await request(app)
      .post('/session')
      .send({ email: user.email, password: '123' });
    expect(response.status).toBe(200);
    expect(response.body.code).toBe(200);
    expect(response.body.content).toHaveProperty('token');
    await User.destroy({ where: { id: user.id } });
  });

  it('should not authenticate without credentials', async () => {
    const user = await factory.create('User');

    const response = await request(app)
      .post('/session')
      .send({ email: user.email });

    expect(response.status).toBe(200);
    expect(response.body.code).toBe(400);
    await User.destroy({ where: { id: user.id } });
  });

  it('should not authenticate with invalid credentials, password incorrect', async () => {
    const user = await factory.create('User', { password: '123' });

    const response = await request(app)
      .post('/session')
      .send({ email: user.email, password: '1234' });

    expect(response.status).toBe(200);
    expect(response.body.code).toBe(401);
    await User.destroy({ where: { id: user.id } });
  });

  it('should not authenticate with invalid credentials, email incorrect', async () => {
    const user = await factory.create('User', { email: 'higor@aparecido.com' });

    const response = await request(app)
      .post('/session')
      .send({
        email: 'higor.menezes@aparecido.com.br',
        password: user.password,
      });

    expect(response.status).toBe(200);
    expect(response.body.code).toBe(404);
    await User.destroy({ where: { id: user.id } });
  });
});
