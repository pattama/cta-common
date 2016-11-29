'use strict';

const validate = require('./validate');
const loader = require('./loader');
const root = require('./root');
const config = require('./config');

module.exports = {
  loader: loader,
  validate: (input, pattern, options) => {
    return validate.validate(input, pattern, options);
  },
  root: (app, ctaCommonRootDirName) => {
    return root.root(app, ctaCommonRootDirName);
  },
  config: (name) => {
    return config.config(name);
  },
};
