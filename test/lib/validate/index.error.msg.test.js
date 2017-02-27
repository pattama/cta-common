'use strict';

const o = require('../../common');

describe('validate: error messages', function () {
  it('invalid type', function () {
    const result = o.contract('abc', 'number');
    o.assert.equal(result.error, 'invalid type for value "abc", expected "number"');
  });
  it('invalid type', function () {
    const result = o.contract(123, ['string', 'boolean']);
    o.assert.isNotOk(result.isValid);
  });
});
