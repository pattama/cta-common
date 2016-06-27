'use strict';

const assert = require('chai').assert;
const Validate = require('../../lib/validate/');

describe('validate: error messages', function() {
  it('invalid type', function() {
    const result = new Validate('abc', 'number');
    assert.equal(result.error, 'invalid type for value "abc", expected "number"');
  });
});
