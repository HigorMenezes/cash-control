const { Category } = require('../models');
const logger = require('../../utils/winstonUtil')('info', 'categoryController');

const categoryController = {
  create: async (req, res) => {
    try {
      if (req.body && req.userId && req.body.name) {
        const { name } = req.body;
        const { userId } = req;
        try {
          const categories = await Category.create({ name, userId });

          return res.send({
            code: 201,
            massage: 'Category created with success',
            content: { categories },
          });
        } catch (err) {
          logger.error('Create - Bad request', err);
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
      logger.error('Create - Error during category creating', err);
      return res.send({
        code: 500,
        message: 'Error during category creating',
      });
    }
  },
  listAll: async (req, res) => {
    try {
      if (req.userId) {
        const { userId } = req;
        const categories = await Category.findAll({
          where: { userId },
        });

        return res.send({
          code: 200,
          message: 'Category recovered with success',
          content: { categories },
        });
      }
      logger.error('ListAll - Bad request');
      return res.send({
        code: 400,
        message: 'Bad request',
      });
    } catch (err) {
      logger.error('ListAll - Error during get categories', err);
      return res.send({
        code: 500,
        message: 'Error during get categories',
      });
    }
  },
  listById: async (req, res) => {
    try {
      if (req.userId && req.params && req.params.id) {
        const { id } = req.params;
        const { userId } = req;

        try {
          const categories = await Category.findAll({ where: { id, userId } });
          return res.send({
            code: 200,
            message: 'Category recovered with success',
            content: { categories },
          });
        } catch (err) {
          logger.error('ListById - Bad request', err);
          return res.send({
            code: 400,
            massage: 'Bad request',
          });
        }
      }

      logger.error('ListById - Bad request');
      return res.send({
        code: 400,
        message: 'Bad request',
      });
    } catch (err) {
      logger.error('ListById - Error during get category', err);
      return res.send({
        code: 500,
        message: 'Error during get category',
      });
    }
  },
  edit: async (req, res) => {
    try {
      if (
        req.params &&
        req.params.id &&
        (req.body && req.userId && req.body.name)
      ) {
        const { id } = req.params;
        const { name } = req.body;
        const { userId } = req;

        try {
          await Category.update({ name }, { where: { id, userId } });
          const categories = await Category.findAll({ where: { id, userId } });
          return res.send({
            code: 200,
            message: 'Category edited with success',
            content: { categories },
          });
        } catch (err) {
          logger.error('Edit - Bad request', err);
          return res.send({
            code: 400,
            massage: 'Bad request',
          });
        }
      }

      return res.send({
        code: 400,
        message: 'Bad request - some data are missing',
      });
    } catch (err) {
      logger.error('Edit - Error during category editing', err);
      return res.send({
        code: 500,
        message: 'Error during category editing',
      });
    }
  },
};

module.exports = categoryController;
