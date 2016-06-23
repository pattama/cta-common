'use strict';

const assert = require('chai').assert;
const Validate = require('../../lib/validate/');

describe('validate: options', function() {
  it('throwErr enabled', function() {
    try {
      const result = new Validate({a: 1}, {a: 'string'}, {throwErr: true});
      assert.fail('should throw an error');
    } catch (e) {
      assert(e);
    }
  });

  it('throwErr disabled', function() {
    try {
      const result = new Validate({a: 1}, {a: 'string'}, {throwErr: false});
      assert.isNotOk(result.isValid);
    } catch (e) {
      assert.fail('should not throw an error');
    }
  });
});

