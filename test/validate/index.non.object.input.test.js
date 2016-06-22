'use strict';

const assert = require('chai').assert;
const Validate = require('../../lib/validate/');

describe('validate: non object input', function() {
  context('string pattern', function() {
    it('non object string patterns', function() {
      let result;
      result = new Validate(123, 'number');
      assert.isOk(result.isValid);
      assert.strictEqual(result.output, 123);
      result = new Validate('abc', 'number');
      assert.isNotOk(result.isValid);

      result = new Validate('abc', 'string');
      assert.isOk(result.isValid);
      assert.strictEqual(result.output, 'abc');
      result = new Validate(123, 'string');
      assert.isNotOk(result.isValid);

      result = new Validate(true, 'boolean');
      assert.isOk(result.isValid);
      assert.strictEqual(result.output, true);
      result = new Validate(123, 'boolean');
      assert.isNotOk(result.isValid);
    });
  });

  context('object pattern', function() {
    it('simple', function() {
      let result = new Validate(123, {type: 'number'});
      assert.isOk(result.isValid);
      assert.strictEqual(result.output, 123);
      result = new Validate(true, {type: 'number'});
      assert.isNotOk(result.isValid);

      result = new Validate('abc', {type: ['number', 'string']});
      assert.isOk(result.isValid);
      assert.strictEqual(result.output, 'abc');
      result = new Validate(false, {type: ['number', 'string']});
      assert.isNotOk(result.isValid);
    });

    it('with optional', function() {
      let result;
      const pattern = {
        type: 'string',
        optional: true,
        defaultTo: 'abc',
      };
      result = new Validate(undefined, pattern);
      assert.isOk(result.isValid);
      assert.strictEqual(result.output, 'abc');

      result = new Validate('def', pattern);
      assert.isOk(result.isValid);
      assert.strictEqual(result.output, 'def');

      result = new Validate(true, pattern);
      assert.isNotOk(result.isValid);
    });
  });

  context('array pattern', function() {
    it('array of string patterns', function() {
      let result;
      result = new Validate(123, ['number', 'string']);
      assert.isOk(result.isValid);
      assert.strictEqual(result.output, 123);
      result = new Validate(true, ['number', 'string']);
      assert.isNotOk(result.isValid);
    });

    it('array of object patterns', function() {
      let result;
      const pattern = {
        type: 'string',
        optional: true,
        defaultTo: 'abc',
      };
      result = new Validate(123, ['number', pattern]);
      assert.isOk(result.isValid);
      assert.strictEqual(result.output, 123);

      result = new Validate('def', ['number', pattern]);
      assert.isOk(result.isValid);
      assert.strictEqual(result.output, 'def');

      result = new Validate(undefined, ['number', pattern]);
      assert.isOk(result.isValid);
      assert.strictEqual(result.output, 'abc');

      result = new Validate(true, ['number', pattern]);
      assert.isNotOk(result.isValid);
    });
  });
});

/*
it('array with items of the same type', function() {
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
  let result = new Validate(['abc', {a: 1, b: true}], pattern);
  assert.isOk(result.isValid);
  result = new Validate(['abc', 123], pattern);
  assert.isNotOk(result.isValid);
  result = new Validate([{a: 1, b: true}, false], pattern);
  assert.isNotOk(result.isValid);
});
*/