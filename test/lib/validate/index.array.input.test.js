'use strict';

const o = require('../../common');

describe('validate: array input', function() {
  it('array of simple same types', function() {
    const result = o.validate(123, {type: 'array', items: 'number'});
    o.assert.isNotOk(result.isValid, 'should not be ok');
  });
  it('array of simple same types', function() {
    const pattern = {
      type: 'array',
      items: 'string',
    };
    let result = o.validate(['abc', 'def'], pattern);
    o.assert.isOk(result.isValid, 'should be ok');
    o.assert.deepEqual(result.output, ['abc', 'def']);
    result = o.validate(['abc', 123], pattern);
    o.assert.isNotOk(result.isValid, 'should not be ok');
  });

  it('array of simple different types', function() {
    const input = [123, 'abc', true, 456];
    let result = o.validate(input, {
      type: 'array',
      items: ['number', 'string', 'boolean'],
    });
    o.assert.isOk(result.isValid);
    o.assert.deepEqual(result.output, input);
    result = o.validate(input, {
      type: 'array',
      items: ['number', 'string'],
    });
    o.assert.isNotOk(result.isValid);
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
    let result = o.validate(input, pattern);
    o.assert.isOk(result.isValid);
    o.assert.deepEqual(result.output, input);
    input[0].b = 2;
    result = o.validate(input, pattern);
    o.assert.isNotOk(result.isValid);
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
    let result = o.validate(input, pattern);
    o.assert.isOk(result.isValid);
    o.assert.deepEqual(result.output, input);
    input[0].b = 2;
    result = o.validate(input, pattern);
    o.assert.isNotOk(result.isValid);
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
    let result = o.validate(['abc', {a: 1, b: true}], pattern);
    o.assert.isOk(result.isValid);
    o.assert.deepEqual(result.output, ['abc', {a: 1, b: true}]);
    result = o.validate(['abc', 123], pattern);
    o.assert.isNotOk(result.isValid);
    result = o.validate([{a: 1, b: true}, false], pattern);
    o.assert.isNotOk(result.isValid);
  });
});