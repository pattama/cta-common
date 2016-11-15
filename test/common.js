'use strict';

const lib = require('../lib');
const chai = require('chai');
const sinon = require('sinon');

module.exports = {
  lib: lib,
  validate: lib.validate,
  loader: lib.loader,
  assert: chai.assert,
  sinon: sinon,
  path: require('path'),
};
