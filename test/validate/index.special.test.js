'use strict';

const assert = require('chai').assert;
const Validate = require('../../lib/validate/');

describe('validate: special cases', function() {
  it('null input', function() {
    const result = new Validate(null, {a: 'number', b: 'boolean'});
    assert.isNotOk(result.isValid);
  });
});
