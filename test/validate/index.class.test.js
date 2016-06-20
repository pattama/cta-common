'use strict';

const assert = require('chai').assert;
const Validate = require('../../lib/validate/class');

describe('validate / basic', function() {
  it('single pattern ok', function() {
    const result = new Validate({a: 123, b: true}, {a: 'number', b: 'boolean'});
    assert.isOk(result.isValid);
  });

  it('single pattern nok', function() {
    const result = new Validate({a: 123, b: true}, {a: 'string', b: 'number'});
    assert.isNotOk(result.isValid);
  });

  it('multiple patterns ok', function() {
    const result = new Validate({a: 123}, {a: ['number', 'string']});
    assert.isOk(result.isValid);
  });

  it('multiple patterns nok', function() {
    const result = new Validate({a: true}, {a: ['number', 'string']});
    assert.isNotOk(result.isValid);
  });

  it('object pattern ok', function() {
    const result = new Validate({a: 123}, {a: {
      type: 'number',
    }});
    assert.isOk(result.isValid);
  });

  it('object pattern nok', function() {
    const result = new Validate({a: true}, {
      a: {
        type: 'string',
      },
    });
    assert.isNotOk(result.isValid);
  });

  it('object pattern with optional key', function() {
    const result = new Validate({a: 123}, {
      a: 'number',
      b: {
        type: 'string',
        optional: true,
        defaultTo: 456,
      },
    });
    assert.isOk(result.isValid);
    assert.deepEqual(result.output, {a: 123, b: 456});
  });

  it('object pattern with array type', function() {
    const input = {
      a: 123,
      b: ['abc', 'def'],
    };
    const result = new Validate(input, {
      a: 'number',
      b: {
        type: 'array',
        items: 'string',
      }});
    assert.isOk(result.isValid);
  });

  it('object pattern with array of objects type', function() {
    const input = {
      a: 123,
      b: [{
        c: 'abc',
        d: true,
      }],
    };
    const result = new Validate(input, {
      a: 'number',
      b: {
        type: 'array',
        items: {
          c: 'string',
          d: 'boolean',
        },
      }});
    assert.isOk(result.isValid);
  });

  it('object pattern with 2 depths ok', function() {
    const input = {a: {b: 'abc', c: 123}};
    const result = new Validate(input, {
      a: {
        type: 'object',
        items: {
          b: 'string',
          c: 'number',
        },
      },
    });
    assert.isOk(result.isValid);
  });

  it('object pattern with 2 depths nok', function() {
    const input = {a: {b: 'abc', c: 123}};
    const result = new Validate(input, {
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

  it('object pattern with 3 depths ok', function() {
    const input = {
      a: {
        b: 'abc',
        c: {
          d: 12,
          e: 'def',
        },
      },
    };
    const result = new Validate(input, {
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
    });
    assert.isOk(result.isValid);
  });

  it('object pattern with 3 depths nok', function() {
    const input = {
      a: {
        b: 'abc',
        c: {
          d: true,
          e: 'def',
        },
      },
    };
    const result = new Validate(input, {
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
    });
    assert.isNotOk(result.isValid);
  });
});
