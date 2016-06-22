'use strict';

const assert = require('chai').assert;
const Validate = require('../../lib/validate/');
const pattern = require('./index.bricks.testdata/pattern');
const input1 = require('./index.bricks.testdata/input1.ok');
const input2 = require('./index.bricks.testdata/input2.ok');
const input4 = require('./index.bricks.testdata/input4.nok');

describe('validate: cta flowcontrol config', function() {
  it('config1', function() {
    const result = new Validate(input1, pattern);
    assert.isOk(result.isValid);
  });
  it('config2', function() {
    const result = new Validate(input2, pattern);
    assert.isOk(result.isValid);
  });
  it('config4', function() {
    const result = new Validate(input4, pattern);
    assert.isNotOk(result.isValid);
  });
});
