const { Op } = require('sequelize');
const { CashFlow, Category } = require('../models');
const logger = require('../../utils/winstonUtil')('info', 'cashFlowController');

const whereClauseForReport = req => {
  const { userId } = req;
  const {
    id,
    type,
    description,
    categoryId,
    value,
    startDate,
    endDate,
  } = req.body;
  const where = { userId };

  if (id) {
    where.id = id;
  }
  if (type) {
    where.type = type;
  }
  if (description) {
    where.description = description;
  }
  if (categoryId) {
    where.id = categoryId;
  }
  if (value) {
    where.value = value;
  }
  if (startDate) {
    where.date = { [Op.gte]: startDate };
  }
  if (endDate) {
    where.date = { [Op.lte]: endDate };
  }
  return where;
};

const findAllCash = async (userId, type) => {
  try {
    const queryResult = await CashFlow.findAll({
      where: { type, userId },
      raw: true,
    });
    let result = { value: 0.0 };
    if (queryResult.length > 0) {
      result = queryResult.reduce(({ value }, current) => {
        console.log(value);
        return { value: value + current.value };
      });
    }
    return result.value;
  } catch (err) {
    logger.error('findAllCash - Error during find all CashIn', err);
    throw err;
  }
};

const userController = {
  createCashIn: async (req, res) => {
    try {
      if (
        req.userId &&
        req.body &&
        req.body.description &&
        req.body.categoryId &&
        req.body.date &&
        req.body.value
      ) {
        req.body.type = 'cash-in';
        const { type, description, categoryId, date, value } = req.body;
        const { userId } = req;
        const totalCashIn = (await findAllCash(userId, 'cash-in')) + value;
        const totalCashOut = await findAllCash(userId, 'cash-out');
        try {
          const cashFlow = await CashFlow.create({
            type,
            description,
            categoryId,
            date,
            userId,
            value,
          });

          return res.send({
            code: 201,
            massage: 'CashIn created with success',
            content: {
              totalBalance: totalCashIn - totalCashOut,
              totalCashIn,
              totalCashOut,
              cashFlow,
            },
          });
        } catch (err) {
          logger.error('createCashIn - Bad request', err);
          return res.send({
            code: 400,
            massage: 'Bad request',
          });
        }
      }

      return res.send({
        code: 400,
        massage: 'Bad request',
      });
    } catch (err) {
      logger.error('createCashIn - Error during cashIn creating', err);
      return res.send({
        code: 500,
        message: 'Error during cashIn creating',
      });
    }
  },
  createCashOut: async (req, res) => {
    try {
      if (
        req.userId &&
        req.body &&
        req.body.description &&
        req.body.categoryId &&
        req.body.date &&
        req.body.value
      ) {
        req.body.type = 'cash-out';
        const { type, description, categoryId, date, value } = req.body;
        const { userId } = req;
        const totalCashIn = await findAllCash(userId, 'cash-in');
        const totalCashOut = (await findAllCash(userId, 'cash-out')) + value;
        if (totalCashIn - totalCashOut >= 0) {
          try {
            const cashFlow = await CashFlow.create({
              type,
              description,
              categoryId,
              date,
              userId,
              value,
            });

            return res.send({
              code: 201,
              massage: 'CashOut created with success',
              content: {
                totalBalance: totalCashIn - totalCashOut,
                totalCashIn,
                totalCashOut,
                cashFlow,
              },
            });
          } catch (err) {
            logger.error('createCashOut - Bad request', err);
            return res.send({
              code: 400,
              massage: 'Bad request',
            });
          }
        }
        logger.info('createCashOut - There is not enough money');
        return res.send({
          code: 400,
          massage: 'Bad request - there is not enough money',
        });
      }
      logger.error('createCashOut - Bad request');
      return res.send({
        code: 400,
        massage: 'Bad request',
      });
    } catch (err) {
      logger.error('createCashOut - Error during createCashOut creating', err);
      return res.send({
        code: 500,
        message: 'Error during cashOut creating',
      });
    }
  },
  listAll: async (req, res) => {
    try {
      if (req.userId) {
        const { userId } = req;
        const cashFlow = await CashFlow.findAll({
          where: { userId },
          include: [{ model: Category, attributes: ['id', 'name'] }],
          attributes: {
            exclude: ['categoryId', 'userId', 'createdAt', 'updatedAt'],
          },
        });
        const totalCashIn = await findAllCash(userId, 'cash-in');
        const totalCashOut = await findAllCash(userId, 'cash-out');
        return res.send({
          code: 200,
          message: 'CashFlow recovered with success',
          content: {
            totalBalance: totalCashIn - totalCashOut,
            totalCashIn,
            totalCashOut,
            cashFlow,
          },
        });
      }
      return res.send({
        code: 400,
        massage: 'Bad request',
      });
    } catch (err) {
      logger.error('ListAll - Error during retrieving users', err);
      return res.send({
        code: 500,
        message: 'Error during retrieving users',
      });
    }
  },
  report: async (req, res) => {
    try {
      if (req.userId) {
        const { userId } = req;
        const cashFlow = await CashFlow.findAll({
          where: whereClauseForReport(req),
          include: [{ model: Category, attributes: ['id', 'name'] }],
          attributes: {
            exclude: ['categoryId', 'userId', 'createdAt', 'updatedAt'],
          },
        });
        const totalCashIn = await findAllCash(userId, 'cash-in');
        const totalCashOut = await findAllCash(userId, 'cash-out');
        return res.send({
          code: 200,
          message: 'CashFlow recovered with success',
          content: {
            totalBalance: totalCashIn - totalCashOut,
            totalCashIn,
            totalCashOut,
            cashFlow,
          },
        });
      }
      return res.send({
        code: 400,
        massage: 'Bad request',
      });
    } catch (err) {
      logger.error('ListAll - Error during retrieving users', err);
      return res.send({
        code: 500,
        message: 'Error during retrieving users',
      });
    }
  },
};

module.exports = userController;
