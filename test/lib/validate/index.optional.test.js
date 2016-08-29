'use strict';

const o = require('../../common');

describe('validate: optional', () => {
  it('when defaultTo is not set', () => {
    const result = o.validate({}, {
      type: 'object',
      items: {
        a: {type: 'number', optional: true},
      },
    });
    o.assert.isOk(result.isValid);
    o.assert.deepEqual(result.output, {});
  });
  it('when defaultTo is set', () => {
    const result = o.validate({}, {
      type: 'object',
      items: {
        a: {type: 'number', optional: true, defaultTo: 123},
      },
    });
    o.assert.isOk(result.isValid);
    o.assert.deepEqual(result.output, {a: 123});
  });
});
