'use strict';

const o = require('../../common');

describe('validate: optional', () => {
  it('when defaultTo is not set', () => {
    const result = o.validate({}, {
      type: 'object',
      items: {
        a: { type: 'number', optional: true },
      },
    });
    o.assert.isOk(result.isValid);
    o.assert.deepEqual(result.output, {});
  });
  it('when defaultTo is set', () => {
    const result = o.validate({}, {
      type: 'object',
      items: {
        a: { type: 'number', optional: true, defaultTo: 123 },
      },
    });
    o.assert.isOk(result.isValid);
    o.assert.deepEqual(result.output, { a: 123 });
  });
  it('object with undefined optional object field', () => {
    const data = {
      id: '582c2e35b11b5c39d48e2b12',
    };
    const pattern = {
      type: 'object',
      items: {
        id: 'string',
        rest: {
          type: 'object',
          optional: true,
          items: {
            url: 'string',
            method: 'string',
          },
        },
      },
    };
    const result = o.validate(data, pattern);
    o.assert.isOk(result.isValid);
  });
});
