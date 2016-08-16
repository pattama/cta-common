'use strict';

const o = require('../../common');

describe('validate: options', function() {
  it('throwErr enabled', function() {
    try {
      const result = o.validate({a: 1}, {a: 'string'}, {throwErr: true});
      o.assert.fail('should throw an error');
    } catch (e) {
      o.assert(e);
    }
  });

  it('throwErr disabled', function() {
    try {
      const result = o.validate({a: 1}, {a: 'string'}, {throwErr: false});
      o.assert.isNotOk(result.isValid);
    } catch (e) {
      o.assert.fail('should not throw an error');
    }
  });
});

