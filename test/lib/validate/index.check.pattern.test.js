'use strict';

const o = require('../../common');

describe('validate: invalid patterns', function () {
  it('invalid pattern type', function () {
    try {
      o.validate({ a: 1 }, true);
      o.assert.fail('should throw an error');
    } catch (e) {
      o.assert.isOk(e.message.indexOf('invalid pattern') !== -1);
    }
  });
  it('incorrect object pattern', function () {
    try {
      o.validate({ a: 1 }, { type: 'object', items: 'number' });
      o.assert.fail('should throw an error');
    } catch (e) {
      o.assert.isOk(e.message.indexOf('invalid pattern') !== -1);
    }
  });
  it('incorrect array pattern', function () {
    try {
      o.validate([1, 2, 3], { type: 'array', items: 123 });
      o.assert.fail('should throw an error');
    } catch (e) {
      o.assert.isOk(e.message.indexOf('invalid pattern') !== -1);
    }
  });
});
