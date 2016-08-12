'use strict';

const o = require('../../common');

describe('validate: special cases', function() {
  it('null input', function() {
    let result;
    result = o.validate(null, {a: 'number'});
    o.assert.isNotOk(result.isValid);
    result = o.validate(null, {
      type: 'object',
      items: {
        a: {
          type: 'number',
          optional: true,
          defaultTo: 123,
        },
      },
    });
    o.assert.isNotOk(result.isValid);
  });
  it('incorrect object pattern', function() {
    const result = o.validate({a: 1}, {type: 'object', items: 'number'});
    o.assert.isNotOk(result.isValid);
  });
  it('incorrect array pattern', function() {
    const result = o.validate(1, {type: 'array', items: 'string'});
    o.assert.isNotOk(result.isValid);
  });
});
