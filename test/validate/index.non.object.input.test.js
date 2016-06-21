'use strict';

const assert = require('chai').assert;
const Validate = require('../../lib/validate/');

describe('validate: non object input', function() {
  it('one element of one type', function() {
    let result = new Validate(123, 'number');
    assert.isOk(result.isValid);
    result = new Validate(123, 'string');
    assert.isNotOk(result.isValid);
  });

  it('one element of multiple types : ok', function() {
    let result = new Validate(123, ['number', 'string']);
    assert.isOk(result.isValid);
    result = new Validate(true, ['number', 'string']);
    assert.isNotOk(result.isValid);
  });

  it('one element with object pattern', function() {
    let result = new Validate(123, {type: 'number'});
    assert.isOk(result.isValid);
    result = new Validate(true, {type: 'string'});
    assert.isNotOk(result.isValid);
    result = new Validate('abc', {type: ['number', 'string']});
    assert.isOk(result.isValid);
    result = new Validate(false, {type: ['number', 'string']});
    assert.isNotOk(result.isValid);
  });

  it('optional element with default option', function() {
    const result = new Validate(undefined, {
      type: 'string',
      optional: true,
      defaultTo: 456,
    });
    assert.isOk(result.isValid);
    assert.deepEqual(result.output, 456);
  });

  it('array of elements of the same type', function() {
    let result = new Validate(['abc', 'def'], {
      type: 'array',
      items: 'string',
    });
    assert.isOk(result.isValid, 'should be ok');
    result = new Validate(['abc', 123], {
      type: 'array',
      items: 'string',
    });
    assert.isNotOk(result.isValid, 'should not be ok');
  });

  it('array of elements of multiple types', function() {
    const input = [123, 'abc', true, 456];
    let result = new Validate(input, {
      type: 'array',
      items: ['number', 'string', 'boolean'],
    });
    assert.isOk(result.isValid);
    result = new Validate(input, {
      type: 'array',
      items: ['number', 'string'],
    });
    assert.isNotOk(result.isValid);
  });
});
