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
        const checkUsers = await User.findAll({ where: { email } });
        if (checkUsers.length === 0) {
          try {
            const users = await User.create({
              name,
              lastName,
              email,
              password,
              statusId,
            });
            delete users.dataValues.passwordHash;

            return res.send({
              code: 201,
              massage: 'User created with success',
              content: { users },
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
          massage: `Bad request - email ${email} already used`,
        });
      }
      return res.send({
        code: 400,
        massage: 'Bad request - some data are missing',
      });
    } catch (err) {
      logger.error('Create - Error during user creating', err);
      return res.send({
        code: 500,
        message: 'Error during user creating',
      });
    }
  },
  listAll: async (req, res) => {
    try {
      const users = await User.findAll({
        attributes: { exclude: ['passwordHash'] },
      });

      return res.send({
        code: 200,
        message: 'Users recovered with success',
        content: { users },
      });
    } catch (err) {
      logger.error('ListAll - Error during retrieving users', err);
      return res.send({
        code: 500,
        message: 'Error during retrieving users',
      });
    }
  },
  listById: async (req, res) => {
    try {
      if (req.params && req.params.id) {
        const { id } = req.params;

        try {
          const users = await User.findAll({
            where: { id },
            attributes: { exclude: ['passwordHash'] },
          });
          return res.send({
            code: 200,
            message: 'User recovered with success',
            content: { users },
          });
        } catch (err) {
          logger.error('ListById - Bad request', err);
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
      logger.error('ListById - Error while retrieving user', err);
      return res.send({
        code: 500,
        message: 'Error while retrieving user',
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
          await User.update(
            {
              name,
              lastName,
              email,
              password,
              statusId,
            },
            { where: { id } },
          );
          const users = await User.findAll({
            where: { id },
            attributes: { exclude: ['passwordHash'] },
          });

          return res.send({
            code: 200,
            massage: 'User created with success',
            content: { users },
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
        massage: 'Bad request - some data are missing',
      });
    } catch (err) {
      logger.error('Edit - Error while editing user', err);
      return res.send({
        code: 500,
        message: 'Error while editing user',
      });
    }
  },
};

module.exports = userController;
