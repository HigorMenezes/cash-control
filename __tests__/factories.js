const faker = require('faker');
const { factory } = require('factory-girl');
const { User, Category, CashFlow } = require('../src/app/models');

factory.define('User', User, {
  name: faker.name.findName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  statusId: 100,
});

factory.define('Category', Category, {
  name: faker.finance.transactionType(),
  userId: faker.random.number(),
});

factory.define('CashFlow', CashFlow, {
  type: faker.random.word(),
  description: faker.random.words(),
  date: new Date(),
  categoryId: faker.random.number(),
  userId: faker.random.number(),
  value: faker.random.number(),
});

module.exports = factory;
