'use strict';

const assert = require('chai').assert;
const Validate = require('../../lib/validate/');

describe('validate: array input', function() {
  it('array of simple same types', function() {
    const pattern = {
      type: 'array',
      items: 'string',
    };
    let result = new Validate(['abc', 'def'], pattern);
    assert.isOk(result.isValid, 'should be ok');
    assert.deepEqual(result.output, ['abc', 'def']);
    result = new Validate(['abc', 123], pattern);
    assert.isNotOk(result.isValid, 'should not be ok');
  });

  it('array of simple different types', function() {
    const input = [123, 'abc', true, 456];
    let result = new Validate(input, {
      type: 'array',
      items: ['number', 'string', 'boolean'],
    });
    assert.isOk(result.isValid);
    assert.deepEqual(result.output, input);
    result = new Validate(input, {
      type: 'array',
      items: ['number', 'string'],
    });
    assert.isNotOk(result.isValid);
  });

  it('array of same object types', function() {
    const pattern = {
      type: 'array',
      items: [{
        type: 'object',
        items: {
          a: 'number',
          b: 'boolean',
        },
      }],
    };
    const input = [{a: 1, b: true}, {a: 2, b: false}, {a: 3, b: true}];
    let result = new Validate(input, pattern);
    assert.isOk(result.isValid);
    assert.deepEqual(result.output, input);
    input[0].b = 2;
    result = new Validate(input, pattern);
    assert.isNotOk(result.isValid);
  });

  it('array of different object types', function() {
    const pattern = {
      type: 'array',
      items: [{
        type: 'object',
        items: {
          a: 'number',
          b: 'boolean',
        },
      }, {
        type: 'object',
        items: {
          c: 'string',
          d: 'boolean',
        },
      }],
    };
    const input = [{a: 1, b: true}, {c: 'abc', d: false}, {a: 3, b: true}];
    let result = new Validate(input, pattern);
    assert.isOk(result.isValid);
    assert.deepEqual(result.output, input);
    input[0].b = 2;
    result = new Validate(input, pattern);
    assert.isNotOk(result.isValid);
  });

  it('array of simple & object types', function() {
    const pattern = {
      type: 'array',
      items: ['string', {
        type: 'object',
        items: {
          a: 'number',
          b: 'boolean',
        },
      }],
    };
    let result = new Validate(['abc', {a: 1, b: true}], pattern);
    assert.isOk(result.isValid);
    assert.deepEqual(result.output, ['abc', {a: 1, b: true}]);
    result = new Validate(['abc', 123], pattern);
    assert.isNotOk(result.isValid);
    result = new Validate([{a: 1, b: true}, false], pattern);
    assert.isNotOk(result.isValid);
  });
});