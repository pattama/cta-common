'use strict';

const assert = require('chai').assert;
const tools = require('../../lib');
const validate = tools.validate;

describe('validate / options', function() {
  it('throwErr enabled', function() {
    try {
      validate({a: 1}, {a: 'string'}, {throwErr: true});
      assert.fail('passed', 'should throw an error');
    } catch (e) {
      assert(typeof e.message === 'string');
    }
  });

  it('throwErr disabled', function() {
    try {
      const result = validate({a: 1}, {a: 'string'}, {throwErr: false});
      assert.strictEqual(result.isValid, false);
    } catch (e) {
      assert.fail(e.message, 'should not throw an error');
    }
  });
});

