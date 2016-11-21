'use strict';

const validate = require('./validate');
const loader = require('./loader');
const root = require('./root');

module.exports = {
  validate: (input, pattern, options) => {
    return validate.validate(input, pattern, options);
  },
  loader: loader,
  root: root,
};
