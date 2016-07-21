'use strict';

const tools = require('../lib');
const chai = require('chai');

module.exports = {
  tools: tools,
  validate: tools.validate,
  assert: chai.assert,
};
