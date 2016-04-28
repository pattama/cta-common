'use strict';

const assert = require('chai').assert;
const tools = require('../lib');

describe('index', function() {
  it('should exports main modules', function() {
    assert(tools.validate, 'export validate module');
  });
});
