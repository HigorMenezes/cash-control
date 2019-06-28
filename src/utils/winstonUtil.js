const winston = require('winston');
require('winston-daily-rotate-file');
const logConfig = require('../configs/logConfig');

const formatPrint = info => {
  const { timestamp, level, message, ...args } = info;
  return `${timestamp} - [${level.toUpperCase()}]: ${message} ${
    Object.keys(args).length ? JSON.stringify(args, null, 2) : ''
  }`;
};

const winstonUtil = (level, filename) => {
  const logger = winston.createLogger({
    level: level || logConfig.level,
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.printf(formatPrint),
    ),
    transports: [
      new winston.transports.DailyRotateFile({
        filename: `logs/${filename || logConfig.defaultFilename}-%DATE%.log`,
        datePattern: 'YYYY-MM-DD',
        zippedArchive: true,
        maxSize: logConfig.maxSize,
        maxFiles: logConfig.maxFiles,
      }),
    ],
  });

  if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console());
  }
  return logger;
};

module.exports = winstonUtil;
