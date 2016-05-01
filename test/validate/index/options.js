'use strict';

const assert = require('chai').assert;
const tools = require('../../../lib');
const validate = tools.validate;

describe('validate / options', function() {
  it('throw an error if invalid input', function() {
    try {
      validate({a: 1}, {a: 'string'});
      assert.fail('passed', 'should throw an error');
    } catch (e) {
      assert(typeof e.message === 'string');
    }
  });

  it('return object if invalid input', function() {
    try {
      const result = validate({a: 1}, {a: 'string'}, {throwErr: false});
      assert.strictEqual(result.isValid, false);
    } catch (e) {
      assert.fail(e.message, 'should not throw an error');
    }
  });
});

