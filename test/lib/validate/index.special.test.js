'use strict';

const o = require('../../common');

describe('validate: in cases', function() {
  it('null input, mandatory', function() {
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
  it('null input, optional object', () => {
    const result = o.validate(null, {
      type: 'object',
      optional: true,
      items: {
        author: {optional: true, type: 'string', defaultTo: 'UNKNOWN'},
        level: {optional: true, type: 'string', defaultTo: 'debug'},
        console: {optional: true, type: 'boolean', defaultTo: true},
        file: {optional: true, type: 'boolean', defaultTo: true},
        filename: {optional: true, type: 'string', defaultTo: './temp.log'},
      },
      defaultToOptionals: true,
    });
    o.assert.isOk(result.isValid);
    o.assert.deepEqual(result.output, {
      author: 'UNKNOWN',
      level: 'debug',
      console: true,
      file: true,
      filename: './temp.log',
    });
  });
});
