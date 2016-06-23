'use strict';

const assert = require('chai').assert;
const Validate = require('../../lib/validate/');

describe('validate: special cases', function() {
  it('null input', function() {
    const result = new Validate(null, {a: 'number'});
    assert.isNotOk(result.isValid);
  });
  it('incorrect object pattern', function() {
    const result = new Validate({a: 1}, {type: 'object', items: 'number'});
    assert.isNotOk(result.isValid);
  });
  it('incorrect array pattern', function() {
    const result = new Validate(1, {type: 'array', items: 'string'});
    assert.isNotOk(result.isValid);
  });
});
