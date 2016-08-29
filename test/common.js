'use strict';

const tools = require('../lib');
const chai = require('chai');
const sinon = require('sinon');

module.exports = {
  tools: tools,
  validate: tools.validate,
  assert: chai.assert,
  sinon: sinon,
};
