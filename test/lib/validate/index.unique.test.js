'use strict';

const o = require('../../common');

describe('validate: unique', function() {
  it('array of unique simple items', function() {
    let result;
    const pattern = {
      type: 'array',
      unique: true,
      items: {
        type: 'number',
      },
    };
    result = o.validate([1, 2, 3], pattern);
    o.assert.isOk(result.isValid, 'should be ok');
    result = o.validate([1, 2, 1, 3], pattern);
    o.assert.isNotOk(result.isValid, 'should not be ok');
  });

  it('array of unique object items', function() {
    let result;
    const pattern = {
      type: 'array',
      unique: true,
      items: {
        type: 'object',
        items: {
          a: 'number',
        },
      },
    };
    result = o.validate([{a: 1}, {a: 2}, {a: 3}], pattern);
    o.assert.isOk(result.isValid, 'should be ok');
    result = o.validate([{a: 1}, {a: 2}, {a: 1}], pattern);
    o.assert.isNotOk(result.isValid, 'should not be ok');
  });

  it('array of objects with one unique property', function() {
    let result;
    const pattern = {
      type: 'array',
      items: {
        type: 'object',
        items: {
          a: { type: 'string', unique: true },
          b: 'number',
        },
      },
    };
    result = o.validate([{a: 'x', b: 1}, {a: 'y', b: 2}], pattern);
    o.assert.isOk(result.isValid, 'should be ok');
    result = o.validate([{a: 'x', b: 1}, {a: 'x', b: 2}], pattern);
    o.assert.isNotOk(result.isValid, 'should not be ok');
  });

  it('array of objects with multiple unique properties', function() {
    let result;
    const pattern = {
      type: 'array',
      items: {
        type: 'object',
        items: {
          a: { type: 'string', unique: true },
          b: { type: 'number', unique: true },
          c: 'boolean',
        },
      },
    };
    result = o.validate([{a: 'x', b: 1, c: true}, {a: 'y', b: 2, c: false}], pattern);
    o.assert.isOk(result.isValid, 'should be ok');
    result = o.validate([{a: 'x', b: 1, c: true}, {a: 'x', b: 2, c: false}], pattern);
    o.assert.isNotOk(result.isValid, 'should not be ok');
    result = o.validate([{a: 'x', b: 1, c: true}, {a: 'y', b: 1, c: false}], pattern);
    o.assert.isNotOk(result.isValid, 'should not be ok');
  });
});

