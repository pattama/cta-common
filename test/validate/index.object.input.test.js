'use strict';

const assert = require('chai').assert;
const Validate = require('../../lib/validate/');

describe('validate: object input', function() {
  it('null input', function() {
    const result = new Validate(null, {a: 'number', b: 'boolean'});
    assert.isNotOk(result.isValid);
  });

  it('keys of one type', function() {
    const pattern = {
      type: 'object',
      items: {
        a: 'number',
        b: 'boolean',
      },
    };
    let result = new Validate({a: 123, b: true}, pattern);
    assert.isOk(result.isValid, 'should be ok');
    result = new Validate({a: 'abc', b: true}, pattern);
    assert.isNotOk(result.isValid, 'should not be ok (1)');
    result = new Validate({a: 123}, pattern);
    assert.isNotOk(result.isValid, 'should not be ok (2)');
  });

  it('keys of multiple types', function() {
    const pattern = {
      type: 'object',
      items: {
        a: ['number', 'string'],
        b: ['string', 'boolean'],
      },
    };
    let result = new Validate({a: 123, b: 'abc'}, pattern);
    assert.isOk(result.isValid);
    result = new Validate({a: true, b: 'abc'}, pattern);
    assert.isNotOk(result.isValid);
  });

  it('object pattern', function() {
    const pattern = {
      type: 'object',
      items: {
        a: {
          type: 'number',
        },
        b: {
          type: 'string',
        },
      },
    };
    let result = new Validate({a: 123, b: 'abc'}, pattern);
    assert.isOk(result.isValid);
    result = new Validate({a: 'abc', b: 123}, pattern);
    assert.isNotOk(result.isValid);
  });

  it('optional key with default option', function() {
    const pattern = {
      type: 'object',
      items: {
        a: 'number',
        b: {
          type: 'string',
          optional: true,
          defaultTo: 456,
        },
      },
    };
    let result = new Validate({a: 123}, pattern);
    assert.isOk(result.isValid);
    assert.deepEqual(result.output, {a: 123, b: 456});
    result = new Validate({a: 'abc'}, pattern);
    assert.isNotOk(result.isValid);
  });

  it('key as array of elements with same type', function() {
    const pattern = {
      type: 'object',
      items: {
        a: 'number',
        b: {
          type: 'array',
          items: 'string',
        },
      },
    };
    let result = new Validate({
      a: 123,
      b: ['abc', 'def'],
    }, pattern);
    assert.isOk(result.isValid);
    result = new Validate({
      a: 123,
      b: ['abc', 123],
    }, pattern);
    assert.isNotOk(result.isValid);
  });

  it('key as array of elements with object type', function() {
    const pattern = {
      type: 'object',
      items: {
        a: 'number',
        b: {
          type: 'array',
          items: {
            type: 'object',
            items: {
              c: 'number',
              d: 'boolean',
            },
          },
        },
      },
    };
    const input = {
      a: 123,
      b: [{c: 1, d: true}, {c: 2, d: false}],
    };
    let result = new Validate(input, pattern);
    assert.isOk(result.isValid, 'should be ok');
    input.b.push({c: 3, d: 'abc'});
    result = new Validate(input, pattern);
    assert.isNotOk(result.isValid, 'should not be ok');
  });

  it('object with 2 depths', function() {
    const pattern = {
      type: 'object',
      items: {
        a: {
          type: 'object',
          items: {
            b: 'string',
            c: 'number',
          },
        },
      },
    };
    const input = {a: {b: 'abc', c: 123}};
    let result = new Validate(input, pattern);
    assert.isOk(result.isValid);
    input.a.c = false;
    result = new Validate(input, pattern);
    assert.isNotOk(result.isValid);
  });

  it('object with 3 depths', function() {
    const pattern = {
      type: 'object',
      items: {
        a: {
          type: 'object',
          items: {
            b: 'string',
            c: {
              type: 'object',
              items: {
                d: 'number',
                e: 'string',
              },
            },
          },
        },
      },
    };
    const input = {
      a: {
        b: 'abc',
        c: {
          d: 12,
          e: 'def',
        },
      },
    };
    let result = new Validate(input, pattern);
    assert.isOk(result.isValid);
    input.a.c.e = true;
    result = new Validate(input, pattern);
    assert.isNotOk(result.isValid);
  });
});
