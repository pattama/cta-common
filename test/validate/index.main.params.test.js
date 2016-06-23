'use strict';

const assert = require('chai').assert;
const Validate = require('../../lib/validate/');

describe('validate: main arguments', function() {
  it('reject if no arguments passed', function() {
    try {
      let result = new Validate();
    } catch (e) {
      console.log(e);
      assert(e.message);
    }
  });
  it('reject if invalid pattern: undefined', function() {
    try {
      let result = new Validate(1);
    } catch (e) {
      console.log(e);
      assert(e.message);
    }
  });
  it('reject if invalid pattern: wrong type', function() {
    try {
      let result = new Validate(1, 2);
    } catch (e) {
      console.log(e);
      assert(e.message);
    }
  });
  it('reject if invalid pattern: wrong type', function() {
    try {
      let result = new Validate(1, null);
    } catch (e) {
      console.log(e);
      assert(e.message);
    }
  });
  it('reject if invalid array pattern', function() {
    try {
      let result = new Validate(1, ['number', 1]);
    } catch (e) {
      console.log(e);
      assert(e.message);
    }
  });
});
