'use strict';

const lib = require('../lib');
const chai = require('chai');
const sinon = require('sinon');
const path = require('path');

module.exports = {
  lib,
  validate: lib.validate,
  contract: lib.contract,
  loader: lib.loader,
  root: lib.root,
  config: lib.config,
  assert: chai.assert,
  sinon,
  path,
};
