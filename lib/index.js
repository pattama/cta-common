/**
 * This source code is provided under the Apache 2.0 license and is provided
 * AS IS with no warranty or guarantee of fit for purpose. See the project's
 * LICENSE.md for details.
 * Copyright 2017 Thomson Reuters. All rights reserved.
 */

'use strict';

const validate = require('./validate');
const loader = require('./loader');
const root = require('./root');
const config = require('./config');

module.exports = {
  loader: loader,
  validate: (input, pattern, options) =>
     validate.validate(input, pattern, options),
  root: (app, ctaCommonRootDirName) =>
     root.root(app, ctaCommonRootDirName),
  config: name =>
     config.config(name)
  ,
};
