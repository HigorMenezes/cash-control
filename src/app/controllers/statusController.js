const { Status } = require('../models');
const logger = require('../../utils/winstonUtil')('info', 'statusController');

const statusController = {
  create: async (req, res) => {
    try {
      if (req.body && req.body.id && req.body.name && req.body.description) {
        const { id, name, description } = req.body;
        try {
          const status = await Status.create({ id, name, description });

          return res.send({
            code: 201,
            massage: 'Status created with success',
            content: { status },
          });
        } catch (err) {
          logger.error(err);
          return res.send({
            code: 400,
            massage: 'Bad request',
            content: { err },
          });
        }
      }

      return res.send({
        code: 400,
        massage: 'Bad request',
      });
    } catch (err) {
      logger.error(err);
      return res.send({
        code: 500,
        message: 'Error while creating status',
        content: { err },
      });
    }
  },
  listAll: async (req, res) => {
    try {
      const status = await Status.findAll();

      return res.send({
        code: 200,
        message: 'Status recovered with success',
        content: { status },
      });
    } catch (err) {
      logger.error(err);
      return res.send({
        code: 500,
        message: 'Error while retrieving status',
        content: { err },
      });
    }
  },
  listById: async (req, res) => {
    try {
      if (req.params && req.params.id) {
        const { id } = req.params;

        try {
          const status = await Status.findOne({ where: { id } });
          return res.send({
            code: 200,
            message: 'Status recovered with success',
            content: { status },
          });
        } catch (err) {
          logger.error(err);
          return res.send({
            code: 400,
            massage: 'Bad request',
            content: { err },
          });
        }
      }

      return res.send({
        code: 400,
        message: 'Bad request',
      });
    } catch (err) {
      logger.error(err);
      return res.send({
        code: 500,
        message: 'Error while retrieving status',
        content: { err },
      });
    }
  },
  edit: async (req, res) => {
    try {
      if (
        req.params &&
        req.params.id &&
        (req.body && req.body.id && req.body.name && req.body.description)
      ) {
        const { id } = req.params;
        const { name, description } = req.body;

        try {
          const [status] = await Status.update(
            { id, name, description },
            { where: { id } },
          );
          return res.send({
            code: 200,
            message: 'Status edited with success',
            content: { status },
          });
        } catch (err) {
          logger.error(err);
          return res.send({
            code: 400,
            massage: 'Bad request',
            content: { err },
          });
        }
      }

      return res.send({
        code: 400,
        message: 'Bad request',
      });
    } catch (err) {
      logger.error(err);
      return res.send({
        code: 500,
        message: 'Error while retrieving status',
        content: { err },
      });
    }
  },
};

module.exports = statusController;
