const morgan = require('morgan');
const fileRotate = require('file-stream-rotator');
const logConfig = require('../configs/logConfig');

const morganUtil = (
  format = ':date[iso] - :remote-addr - :remote-user ":method :url HTTP/:http-version" :status :res[content-length] B - :response-time ms',
) => {
  return morgan(format, {
    stream: fileRotate.getStream({
      filename: `logs/access/${logConfig.defaultFilename}-%DATE%.log`,
      size: logConfig.maxSize,
      max_logs: logConfig.maxFiles,
      verbose: false,
      date_format: 'YYYY-MM-DD',
    }),
  });
};

module.exports = morganUtil;
