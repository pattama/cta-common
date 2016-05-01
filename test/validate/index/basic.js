'use strict';

const assert = require('chai').assert;
const tools = require('../../lib');
const validate = tools.validate;

describe('validate / basic', function() {
  it('reject if invalid pattern', function() {
    try {
      validate();
    } catch (e) {
      assert(e.message);
    }
  });
  it('reject if invalid input type', function() {
    try {
      validate(null, {key: 'string'});
    } catch (e) {
      assert.equal(e.message, 'validate module => invalid input object');
    }
  });
  it('reject if invalid input type', function() {
    try {
      validate('abc', {key: 'string'});
    } catch (e) {
      assert.equal(e.message, 'validate module => invalid input object');
    }
  });
  it('reject if missing mandatory field', function() {
    try {
      validate({key: 'abc'}, {key: 'string', value: 'integer'});
    } catch (e) {
      assert.equal(e.message, 'validate module => missing parameter "value"');
    }
  });
  it('reject if wrong type of field', function() {
    try {
      validate({key: 'abc', value: 'def'}, {key: 'string', value: 'integer'});
    } catch (e) {
      assert.equal(e.message, 'validate module => invalid parameter type "value", provided "string", expected "integer"');
    }
  });
  it('set optional fields to their defaults', function() {
    const input = {key: 'abc'};
    const pattern = {
      key: {
        type: 'string',
      },
      value: {
        optional: true,
        type: 'object',
        defaultTo: {
          a: 1,
          b: 2,
        },
      },
    };
    const result = validate(input, pattern);
    assert.deepEqual(result.output, {
      key: 'abc',
      value: {
        a: 1,
        b: 2,
      },
    });
  });
});

