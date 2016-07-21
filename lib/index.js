'use strict';

const validate = require('./validate');

module.exports = {
  validate: (input, pattern, options) => {
    return validate.validate(input, pattern, options);
  },
};
