const { Status } = require('../models');
const logger = require('../../utils/winstonUtil')('info', 'statusController');

const statusController = {
  create: async (req, res) => {
    try {
      if (req.body && req.body.id && req.body.name && req.body.description) {
        let status = {};
        try {
          status = await Status.create(req.body);
        } catch (err) {
          logger.error(err);
          return res.send({
            code: 400,
            massage: 'Bad request',
            content: {
              err,
            },
          });
        }

        return res.send({
          code: 201,
          massage: 'Status created with success',
          content: {
            status,
          },
        });
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
        content: {
          err,
        },
      });
    }
  },
  listAll: async (req, res) => {
    try {
      const status = await Status.findAll();

      return res.send({
        code: 200,
        message: 'Status recovered with success',
        content: {
          status,
        },
      });
    } catch (err) {
      logger.error(err);
      return res.send({
        code: 500,
        message: 'Error while retrieving status',
        content: {
          err,
        },
      });
    }
  },
  listById: async (req, res) => {
    try {
      if (req.params && req.params.id) {
        const statusId = req.params.id;

        let status = {};
        try {
          status = await Status.findOne({
            where: {
              id: statusId,
            },
          });
        } catch (err) {
          logger.error(err);
          return res.send({
            code: 400,
            massage: 'Bad request',
            content: {
              err,
            },
          });
        }

        return res.send({
          code: 200,
          message: 'Status recovered with success',
          content: {
            status,
          },
        });
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
        content: {
          err,
        },
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
        const statusId = req.params.id;

        let status = {};
        try {
          [status] = await Status.update(
            {
              ...req.body,
              id: req.params.id,
            },
            {
              where: {
                id: statusId,
              },
            },
          );
        } catch (err) {
          logger.error(err);
          return res.send({
            code: 400,
            massage: 'Bad request',
            content: {
              err,
            },
          });
        }

        return res.send({
          code: 200,
          message: 'Status edited with success',
          content: {
            status,
          },
        });
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
        content: {
          err,
        },
      });
    }
  },
};

module.exports = statusController;
