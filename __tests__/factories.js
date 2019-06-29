const faker = require('faker');
const { factory } = require('factory-girl');
const { User, Category } = require('../src/app/models');

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

module.exports = factory;
