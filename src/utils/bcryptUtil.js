const bcrypt = require('bcrypt');

const bcryptUtil = {
  hash: async text => {
    const textHash = await bcrypt.hash(text, 8);
    return textHash;
  },
  compare: async (text, hash) => {
    const result = await bcrypt.compare(text, hash);
    return result;
  },
};

module.exports = bcryptUtil;
