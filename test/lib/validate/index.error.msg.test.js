'use strict';

const o = require('../../common');

describe('validate: error messages', function () {
  it('invalid type', function () {
    const result = o.validate('abc', 'number');
    o.assert.equal(result.error, 'invalid type for value "abc", expected "number"');
  });
});
