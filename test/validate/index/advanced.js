'use strict';

const assert = require('chai').assert;
const tools = require('../../lib');
const validate = tools.validate;

describe.skip('validate / advanced', function() {
  it('valid input', function() {
    const pattern = {
      bricks: [{
        name: 'string',
        properties: {
          type: 'object',
          optional: true,
        },
        publish: [{
          topic: 'string',
          data: [{
            nature: {
              type: 'string',
              quality: 'string',
            },
          }],
        }],
      }],
    };
    const input = {
      key: {
        type: 'string',
      },
      value: {
        optional: true,
        type: 'object',
        defaultTo: {
          a: 1,
          b: 2,
        },
      },
    };
    try {
      validate(input, pattern);
    } catch (e) {
      assert.fail('should not throw an error');
    }
  });
});

