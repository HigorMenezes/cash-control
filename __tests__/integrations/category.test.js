const request = require('supertest');
const app = require('../../src/app');
const { User, Category } = require('../../src/app/models');
const factory = require('../factories');

describe('Category - List', () => {
  it('should return property content on body when search for all category', async () => {
    const user = await factory.create('User');
    const response = await request(app)
      .get('/categories')
      .set('Authorization', `bearer ${user.generateToken()}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('content');
    expect(response.body.code).toBe(200);
    await User.destroy({ where: { id: user.id } });
  });

  it('should return property content on body when search for one category', async () => {
    const user = await factory.create('User');
    const category = await factory.create('Category', { userId: user.id });
    const response = await request(app)
      .get(`/categories/${category.id}`)
      .set('Authorization', `bearer ${user.generateToken()}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('content');
    expect(response.body.code).toBe(200);
    await User.destroy({ where: { id: user.id } });
    await Category.destroy({ where: { id: category.id } });
  });
});

describe('Category - Create', async () => {
  it('should create a new Category when send a post to endpoint /categories with valid request and auth', async () => {
    const user = await factory.create('User');
    const response = await request(app)
      .post('/categories')
      .send({
        name: 'buy',
      })
      .set('Authorization', `bearer ${user.generateToken()}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('content');
    expect(response.body.code).toBe(201);
    await User.destroy({ where: { id: user.id } });
    await Category.destroy({
      where: { id: response.body.content.categories.id },
    });
  });

  it('should not create a new Category when send a post to endpoint /categories with valid request but invalid auth', async () => {
    const user = await factory.create('User');
    const response = await request(app)
      .post('/categories')
      .send({
        name: 'buy',
      });

    expect(response.status).toBe(200);
    expect(response.body.code).toBe(401);
    await User.destroy({ where: { id: user.id } });
  });

  it('should not create a new Category when send a post to endpoint /categories with invalid request', async () => {
    const user = await factory.create('User');
    const response = await request(app)
      .post('/categories')
      .send({})
      .set('Authorization', `bearer ${user.generateToken()}`);

    expect(response.status).toBe(200);
    expect(response.body.code).toBe(400);
    await User.destroy({ where: { id: user.id } });
  });
});

describe('Category - edit', () => {
  it('should edit a category when valid request and auth', async () => {
    const user = await factory.create('User');
    const category = await factory.create('Category', { userId: user.id });
    const response = await request(app)
      .patch(`/categories/${category.id}`)
      .send({
        name: 'sell',
      })
      .set('Authorization', `bearer ${user.generateToken()}`);

    expect(response.status).toBe(200);
    expect(response.body.code).toBe(200);
    await User.destroy({ where: { id: user.id } });
    await Category.destroy({ where: { id: category.id } });
  });

  it('should not edit a category when invalid auth', async () => {
    const user = await factory.create('User');
    const category = await factory.create('Category', { userId: user.id });
    const response = await request(app)
      .patch(`/categories/${category.id}`)
      .send({
        name: 'sell',
      });

    expect(response.status).toBe(200);
    expect(response.body.code).toBe(401);
    await User.destroy({ where: { id: user.id } });
    await Category.destroy({ where: { id: category.id } });
  });

  it('should not edit a category when invalid request', async () => {
    const user = await factory.create('User');
    const category = await factory.create('Category', { userId: user.id });
    const response = await request(app)
      .patch(`/categories/${category.id}`)
      .send({})
      .set('Authorization', `bearer ${user.generateToken()}`);

    expect(response.status).toBe(200);
    expect(response.body.code).toBe(400);
    await User.destroy({ where: { id: user.id } });
    await Category.destroy({ where: { id: category.id } });
  });
});
