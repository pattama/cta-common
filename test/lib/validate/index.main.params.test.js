'use strict';

const o = require('../../common');

describe('validate: main arguments', function () {
  it('reject if no arguments passed', function () {
    try {
      o.validate();
    } catch (e) {
      console.log(e);
      o.assert(e.message);
    }
  });
  it('reject if invalid pattern: undefined', function () {
    try {
      o.validate(1);
    } catch (e) {
      console.log(e);
      o.assert(e.message);
    }
  });
  it('reject if invalid pattern: wrong type', function () {
    try {
      o.validate(1, 2);
    } catch (e) {
      console.log(e);
      o.assert(e.message);
    }
  });
  it('reject if invalid pattern: wrong type', function () {
    try {
      o.validate(1, null);
    } catch (e) {
      console.log(e);
      o.assert(e.message);
    }
  });
  it('reject if invalid array pattern', function () {
    try {
      o.validate(1, ['number', 1]);
    } catch (e) {
      console.log(e);
      o.assert(e.message);
    }
  });
});
