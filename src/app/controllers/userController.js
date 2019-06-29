const { User } = require('../models');
const logger = require('../../utils/winstonUtil')('info', 'userController');

const userController = {
  create: async (req, res) => {
    try {
      if (
        req.body &&
        req.body.name &&
        req.body.lastName &&
        req.body.email &&
        req.body.password &&
        req.body.statusId
      ) {
        const { name, lastName, email, password, statusId } = req.body;
        try {
          const user = await User.create({
            name,
            lastName,
            email,
            password,
            statusId,
          });

          return res.send({
            code: 201,
            massage: 'User created with success',
            content: { user },
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
        message: 'Error during user creating',
        content: { err },
      });
    }
  },
  listAll: async (req, res) => {
    try {
      const users = await User.findAll();

      return res.send({
        code: 200,
        message: 'Users recovered with success',
        content: { users },
      });
    } catch (err) {
      logger.error(err);
      return res.send({
        code: 500,
        message: 'Error during retrieving users',
        content: { err },
      });
    }
  },
  listById: async (req, res) => {
    try {
      if (req.params && req.params.id) {
        const { id } = req.params;

        try {
          const users = await User.findOne({ where: { id } });
          return res.send({
            code: 200,
            message: 'User recovered with success',
            content: { users },
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
        message: 'Error while retrieving user',
        content: { err },
      });
    }
  },
  edit: async (req, res) => {
    try {
      if (
        req.params &&
        req.params.id &&
        req.body &&
        req.body.name &&
        req.body.lastName &&
        req.body.email &&
        req.body.password &&
        req.body.statusId
      ) {
        const { id } = req.params;
        const { name, lastName, email, password, statusId } = req.body;
        try {
          const [user] = await User.update(
            {
              name,
              lastName,
              email,
              password,
              statusId,
            },
            { where: { id } },
          );

          return res.send({
            code: 201,
            massage: 'User created with success',
            content: { user },
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
        message: 'Error while editing user',
        content: { err },
      });
    }
  },
};

module.exports = userController;
