const request = require('supertest');
const app = require('../../src/app');
const { User, Category, CashFlow } = require('../../src/app/models');
const factory = require('../factories');

describe('CashFlow - List', () => {
  it('should return property content on body when search for all cashFlow', async () => {
    const user = await factory.create('User');
    const category = await factory.create('Category', { userId: user.id });
    const cashFlowIn = await factory.create('CashFlow', {
      userId: user.id,
      categoryId: category.id,
      type: 'cash-in',
    });
    const cashFlowIn2 = await factory.create('CashFlow', {
      userId: user.id,
      categoryId: category.id,
      type: 'cash-in',
    });

    const response = await request(app)
      .get('/cash-flow')
      .set('Authorization', `bearer ${user.generateToken()}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('content');
    expect(response.body.code).toBe(200);
    await CashFlow.destroy({ where: { id: cashFlowIn.id } });
    await CashFlow.destroy({ where: { id: cashFlowIn2.id } });
    await Category.destroy({ where: { id: category.id } });
    await User.destroy({ where: { id: user.id } });
  });

  it('should not return data when search for all cashFlow with invalid auth', async () => {
    const user = await factory.create('User');
    const category = await factory.create('Category', { userId: user.id });
    const cashFlowIn1 = await factory.create('CashFlow', {
      userId: user.id,
      categoryId: category.id,
      type: 'cash-in',
    });
    const cashFlowIn2 = await factory.create('CashFlow', {
      userId: user.id,
      categoryId: category.id,
      type: 'cash-in',
    });

    const response = await request(app).get('/cash-flow');
    expect(response.status).toBe(200);
    expect(response.body.code).toBe(401);
    await CashFlow.destroy({ where: { id: cashFlowIn1.id } });
    await CashFlow.destroy({ where: { id: cashFlowIn2.id } });
    await Category.destroy({ where: { id: category.id } });
    await User.destroy({ where: { id: user.id } });
  });

  it('should return property content on body when search for cashFlow report', async () => {
    const user = await factory.create('User');
    const category = await factory.create('Category', { userId: user.id });
    const cashFlow = await factory.create('CashFlow', {
      userId: user.id,
      categoryId: category.id,
      type: 'cash-in',
    });

    const response = await request(app)
      .post(`/cash-flow-report`)
      .send({
        id: cashFlow.id,
        type: cashFlow.type,
        description: cashFlow.description,
        categoryId: cashFlow.categoryId,
        value: cashFlow.value,
        startDate: cashFlow.date,
        endDate: cashFlow.date,
      })
      .set('Authorization', `bearer ${user.generateToken()}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('content');
    expect(response.body.code).toBe(200);
    await CashFlow.destroy({ where: { id: cashFlow.id } });
    await Category.destroy({ where: { id: category.id } });
    await User.destroy({ where: { id: user.id } });
  });

  it('should not return CashFlow report when invalid auth ', async () => {
    const user = await factory.create('User');
    const category = await factory.create('Category', { userId: user.id });
    const cashFlow = await factory.create('CashFlow', {
      userId: user.id,
      categoryId: category.id,
      type: 'cash-in',
    });

    const response = await request(app)
      .post(`/cash-flow-report`)
      .send({
        id: cashFlow.id,
        type: cashFlow.type,
        description: cashFlow.description,
        categoryId: cashFlow.categoryId,
        value: cashFlow.value,
        startDate: cashFlow.date,
        endDate: cashFlow.date,
      });

    expect(response.status).toBe(200);
    expect(response.body.code).toBe(401);
    await CashFlow.destroy({ where: { id: cashFlow.id } });
    await Category.destroy({ where: { id: category.id } });
    await User.destroy({ where: { id: user.id } });
  });
});

describe('CashFlowIn - Create', () => {
  it('should create a new CashFlowIn when send a post to endpoint /cash-flow-in with valid request and auth', async () => {
    const user = await factory.create('User');
    const category = await factory.create('Category', { userId: user.id });
    const response = await request(app)
      .post('/cash-flow-in')
      .send({
        description: 'sell a puppy',
        categoryId: category.id,
        value: 2500.33,
        date: new Date(),
      })
      .set('Authorization', `bearer ${user.generateToken()}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('content');
    expect(response.body.code).toBe(201);
    await CashFlow.destroy({
      where: { id: response.body.content.cashFlow.id },
    });
    await Category.destroy({ where: { id: category.id } });
    await User.destroy({ where: { id: user.id } });
  });

  it('should not create a new CashFlowIn when send a post to endpoint /cash-flow-in with valid request but invalid auth', async () => {
    const user = await factory.create('User');
    const category = await factory.create('Category', { userId: user.id });
    const response = await request(app)
      .post('/cash-flow-in')
      .send({
        description: 'sell a puppy',
        categoryId: category.id,
        value: 2500.33,
        date: new Date(),
      });
    expect(response.status).toBe(200);
    expect(response.body.code).toBe(401);
    await Category.destroy({ where: { id: category.id } });
    await User.destroy({ where: { id: user.id } });
  });

  it('should not create a new CashFlowIn when send a post to endpoint /cash-flow-in  with invalid request', async () => {
    const user = await factory.create('User');
    const category = await factory.create('Category', { userId: user.id });
    const response = await request(app)
      .post('/cash-flow-in')
      .send({
        description: 'sell a puppy',
        categoryId: category.id,
        date: new Date(),
      })
      .set('Authorization', `bearer ${user.generateToken()}`);
    expect(response.status).toBe(200);
    expect(response.body.code).toBe(400);
    await Category.destroy({ where: { id: category.id } });
    await User.destroy({ where: { id: user.id } });
  });
});

describe('CashFlowOut - Create', () => {
  it('should create a new CashFlowOut when send a post to endpoint /cash-flow-out with valid request and auth', async () => {
    const user = await factory.create('User');
    const category = await factory.create('Category', { userId: user.id });
    const cashFlow = await factory.create('CashFlow', {
      userId: user.id,
      categoryId: category.id,
      type: 'cash-in',
    });
    const response = await request(app)
      .post('/cash-flow-out')
      .send({
        description: 'sell a puppy',
        categoryId: category.id,
        value: cashFlow.value,
        date: new Date(),
      })
      .set('Authorization', `bearer ${user.generateToken()}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('content');
    expect(response.body.code).toBe(201);
    await CashFlow.destroy({
      where: { id: response.body.content.cashFlow.id },
    });
    await CashFlow.destroy({ where: { id: cashFlow.id } });
    await Category.destroy({ where: { id: category.id } });
    await User.destroy({ where: { id: user.id } });
  });

  it('should not create a new CashFlowOut when send a post to endpoint /cash-flow-out with valid request but invalid auth', async () => {
    const user = await factory.create('User');
    const category = await factory.create('Category', { userId: user.id });
    const cashFlow = await factory.create('CashFlow', {
      userId: user.id,
      categoryId: category.id,
      type: 'cash-in',
    });
    const response = await request(app)
      .post('/cash-flow-out')
      .send({
        description: 'sell a puppy',
        categoryId: category.id,
        value: cashFlow.value,
        date: new Date(),
      });
    expect(response.status).toBe(200);
    expect(response.body.code).toBe(401);
    await CashFlow.destroy({ where: { id: cashFlow.id } });
    await Category.destroy({ where: { id: category.id } });
    await User.destroy({ where: { id: user.id } });
  });

  it('should not create a new CashFlowOut when send a post to endpoint /cash-flow-out  with invalid request', async () => {
    const user = await factory.create('User');
    const category = await factory.create('Category', { userId: user.id });
    const response = await request(app)
      .post('/cash-flow-out')
      .send({
        description: 'sell a puppy',
        categoryId: category.id,
        date: new Date(),
      })
      .set('Authorization', `bearer ${user.generateToken()}`);
    expect(response.status).toBe(200);
    expect(response.body.code).toBe(400);
    await Category.destroy({ where: { id: category.id } });
    await User.destroy({ where: { id: user.id } });
  });

  it('should not create a new CashFlowOut when send a post to endpoint /cash-flow-out without money', async () => {
    const user = await factory.create('User');
    const category = await factory.create('Category', { userId: user.id });
    const response = await request(app)
      .post('/cash-flow-out')
      .send({
        description: 'sell a puppy',
        categoryId: category.id,
        value: 1000,
        date: new Date(),
      })
      .set('Authorization', `bearer ${user.generateToken()}`);
    expect(response.status).toBe(200);
    expect(response.body.code).toBe(400);
    await Category.destroy({ where: { id: category.id } });
    await User.destroy({ where: { id: user.id } });
  });
});
