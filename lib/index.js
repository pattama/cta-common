'use strict';

const validate = require('./validate');
const contract = require('./contract');
const loader = require('./loader');
const root = require('./root');
const config = require('./config');

module.exports = {
  loader: loader,
  validate: (input, pattern, options) =>
     validate.validate(input, pattern, options),
  contract: (input, pattern, options) =>
    contract.contract(input, pattern, options),
  root: (app, ctaCommonRootDirName) =>
     root.root(app, ctaCommonRootDirName),
  config: name =>
     config.config(name)
  ,
};
