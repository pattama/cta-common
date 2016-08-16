'use strict';

const o = require('../../common');

describe('validate: non object input', function() {
  context('string pattern', function() {
    it('non object string patterns', function() {
      let result;
      result = o.validate(123, 'number');
      o.assert.isOk(result.isValid);
      o.assert.strictEqual(result.output, 123);
      result = o.validate('abc', 'number');
      o.assert.isNotOk(result.isValid);

      result = o.validate('abc', 'string');
      o.assert.isOk(result.isValid);
      o.assert.strictEqual(result.output, 'abc');
      result = o.validate(123, 'string');
      o.assert.isNotOk(result.isValid);

      result = o.validate(true, 'boolean');
      o.assert.isOk(result.isValid);
      o.assert.strictEqual(result.output, true);
      result = o.validate(123, 'boolean');
      o.assert.isNotOk(result.isValid);
    });
  });

  context('object pattern', function() {
    it('simple', function() {
      let result = o.validate(123, {type: 'number'});
      o.assert.isOk(result.isValid);
      o.assert.strictEqual(result.output, 123);
      result = o.validate(true, {type: 'number'});
      o.assert.isNotOk(result.isValid);

      result = o.validate('abc', {type: ['number', 'string']});
      o.assert.isOk(result.isValid);
      o.assert.strictEqual(result.output, 'abc');
      result = o.validate(false, {type: ['number', 'string']});
      o.assert.isNotOk(result.isValid);
    });

    it('with optional', function() {
      let result;
      const pattern = {
        type: 'string',
        optional: true,
        defaultTo: 'abc',
      };
      result = o.validate(undefined, pattern);
      o.assert.isOk(result.isValid);
      o.assert.strictEqual(result.output, 'abc');

      result = o.validate('def', pattern);
      o.assert.isOk(result.isValid);
      o.assert.strictEqual(result.output, 'def');

      result = o.validate(true, pattern);
      o.assert.isNotOk(result.isValid);
    });
  });

  context('array pattern', function() {
    it('array of string patterns', function() {
      let result;
      result = o.validate(123, ['number', 'string']);
      o.assert.isOk(result.isValid);
      o.assert.strictEqual(result.output, 123);
      result = o.validate(true, ['number', 'string']);
      o.assert.isNotOk(result.isValid);
    });

    it('array of object patterns', function() {
      let result;
      const pattern = {
        type: 'string',
        optional: true,
        defaultTo: 'abc',
      };
      result = o.validate(123, ['number', pattern]);
      o.assert.isOk(result.isValid);
      o.assert.strictEqual(result.output, 123);

      result = o.validate('def', ['number', pattern]);
      o.assert.isOk(result.isValid);
      o.assert.strictEqual(result.output, 'def');

      result = o.validate(undefined, ['number', pattern]);
      o.assert.isOk(result.isValid);
      o.assert.strictEqual(result.output, 'abc');

      result = o.validate(true, ['number', pattern]);
      o.assert.isNotOk(result.isValid);
    });
  });
});

/*
it('array with items of the same type', function() {
  let result = o.validate(['abc', 'def'], {
    type: 'array',
    items: 'string',
  });
  o.assert.isOk(result.isValid, 'should be ok');
  result = o.validate(['abc', 123], {
    type: 'array',
    items: 'string',
  });
  o.assert.isNotOk(result.isValid, 'should not be ok');
});

it('array of elements of multiple types', function() {
  const input = [123, 'abc', true, 456];
  let result = o.validate(input, {
    type: 'array',
    items: ['number', 'string', 'boolean'],
  });
  o.assert.isOk(result.isValid);
  result = o.validate(input, {
    type: 'array',
    items: ['number', 'string'],
  });
  o.assert.isNotOk(result.isValid);
});

it('array of elements of multiple types with objects', function() {
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
  result = o.validate(['abc', 123], pattern);
  o.assert.isNotOk(result.isValid);
  result = o.validate([{a: 1, b: true}, false], pattern);
  o.assert.isNotOk(result.isValid);
});
*/