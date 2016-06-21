'use strict';

const assert = require('chai').assert;
const Validate = require('../../lib/validate/');

describe('validate: object input', function() {
  it('null input', function() {
    let result = new Validate(null, {a: 'number', b: 'boolean'});
    assert.isNotOk(result.isValid);
  });

  it('keys of one type', function() {
    let result = new Validate({a: 123, b: true}, {a: 'number', b: 'boolean'});
    assert.isOk(result.isValid);
    result = new Validate({a: 123, b: true}, {a: 'string', b: 'number'});
    assert.isNotOk(result.isValid);
    result = new Validate({a: 123}, {a: 'string', b: 'number'});
    assert.isNotOk(result.isValid);
  });

  it('keys of multiple types', function() {
    const input = {a: 123, b: 'abc'};
    let result = new Validate(input, {
      a: ['number', 'string'],
      b: ['string', 'boolean'],
    });
    assert.isOk(result.isValid);
    result = new Validate(input, {
      a: ['number', 'string'],
      b: ['number', 'boolean'],
    });
    assert.isNotOk(result.isValid);
  });

  it('object pattern', function() {
    const input = {a: 123, b: 'abc'};
    let result = new Validate(input, {
      a: {
        type: 'number',
      },
      b: {
        type: 'string',
      },
    });
    assert.isOk(result.isValid);
    result = new Validate(input, {
      a: {
        type: 'string',
      },
      b: {
        type: 'number',
      },
    });
    assert.isNotOk(result.isValid);
  });

  it('optional key with default option', function() {
    const pattern = {
      a: 'number',
      b: {
        type: 'string',
        optional: true,
        defaultTo: 456,
      },
    };
    let result = new Validate({a: 123}, pattern);
    assert.isOk(result.isValid);
    assert.deepEqual(result.output, {a: 123, b: 456});
    result = new Validate({a: 'abc'}, pattern);
    assert.isNotOk(result.isValid);
  });

  it('key as array of elements with same type', function() {
    const input = {
      a: 123,
      b: ['abc', 'def'],
    };
    let result = new Validate(input, {
      a: 'number',
      b: {
        type: 'array',
        items: 'string',
      }});
    assert.isOk(result.isValid);
    result = new Validate(input, {
      a: 'number',
      b: {
        type: 'array',
        items: 'number',
      }});
    assert.isNotOk(result.isValid);
  });

  it('key as array of elements with object type', function() {
    const input = {
      a: 123,
      b: [{c: 1, d: true}, {c: 2, d: false}],
    };
    let result = new Validate(input, {
      a: 'number',
      b: {
        type: 'array',
        items: {
          c: 'number',
          d: 'boolean',
        },
      }});
    assert.isOk(result.isValid, 'should be ok');
    result = new Validate(input, {
      a: 'number',
      b: {
        type: 'array',
        items: {
          c: 'string',
          d: 'boolean',
        },
      }});
    assert.isNotOk(result.isValid, 'should not be ok');
  });

  it('object with 2 depths', function() {
    const input = {a: {b: 'abc', c: 123}};
    let result = new Validate(input, {
      a: {
        type: 'object',
        items: {
          b: 'string',
          c: 'number',
        },
      },
    });
    assert.isOk(result.isValid);
    result = new Validate(input, {
      a: {
        type: 'object',
        items: {
          b: 'boolean',
          c: 'number',
        },
      },
    });
    assert.isNotOk(result.isValid);
  });

  it('object with 3 depths', function() {
    const pattern = {
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
    };
    let result = new Validate({
      a: {
        b: 'abc',
        c: {
          d: 12,
          e: 'def',
        },
      },
    }, pattern);
    assert.isOk(result.isValid);
    result = new Validate({
      a: {
        b: 'abc',
        c: {
          d: true,
          e: 'def',
        },
      },
    }, pattern);
    assert.isNotOk(result.isValid);
  });
});
