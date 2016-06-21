'use strict';

const assert = require('chai').assert;
const Validate = require('../../lib/validate/');
const pattern = require('./index.bricks.testdata/pattern');
const input = require('./index.bricks.testdata/input');

describe.skip('validate: cta flowcontrol config', function() {
  it('full config', function() {
    const result = new Validate(input, pattern);
    assert.isOk(result.isValid);
  });
});
