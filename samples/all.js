'use strict';

const assert = require('chai').assert;
const Validate = require('cta-tools').validate;
let result;

result = new Validate('abc', 'string'); assert(result.isValid);
result = new Validate(123, 'string'); assert(!result.isValid);

result = new Validate('abc', ['string', 'number']); assert(result.isValid);
result = new Validate(123, ['string', 'number']); assert(result.isValid);
result = new Validate(true, ['string', 'number']); assert(!result.isValid);
result = new Validate({a: 123}, [{type: 'object', items: {a: 'number'}}, 'string']); assert(result.isValid);
result = new Validate('abc', [{type: 'object', items: {a: 'number'}}, 'string']); assert(result.isValid);

result = new Validate(undefined, {type: 'string', optional: true, defaultTo: 'abc'}); assert(result.isValid); assert.strictEqual(result.output, 'abc');
result = new Validate(123, {type: 'string', optional: true, defaultTo: 'abc'}); assert(!result.isValid);
result = new Validate(['abc', 'def'], {type: 'array', items: 'string'}); assert(result.isValid);
result = new Validate(['abc', 123], {type: 'array', items: ['string', 'number']}); assert(result.isValid);
result = new Validate(['abc', 123, true], {type: 'array', items: ['string', 'number']}); assert(!result.isValid);

result = new Validate({a: 123, b: 'abc'}, {type: 'object', items: {a: 'number', b: 'string'}}); assert(result.isValid);
result = new Validate({a: 123, b: true}, {type: 'object', items: {a: 'number', b: ['string', 'boolean']}}); assert(result.isValid);
result = new Validate({a: 123, b: { c: 456, d: [789, true]}}, {
  type: 'object',
  items: {
    a: 'number',
    b: {
      type: 'object',
      items: {
        c: 'number',
        d: {
          type: 'array',
          items: ['number', 'boolean'],
        },
      },
    },
  },
}); assert(result.isValid);
result = new Validate({a: 123, b: { c: 456, d: [789, 'abc']}}, {
  type: 'object',
  items: {
    a: 'number',
    b: {
      type: 'object',
      items: {
        c: 'number',
        d: {
          type: 'array',
          items: ['number', 'boolean'],
        },
      },
    },
  },
}); assert(!result.isValid);
result = new Validate({a: {b: {c: {d: 1, e: true}}}}, {
  type: 'object',
  items: {
    a: {
      type: 'object',
      items: {
        b: {
          type: 'object',
          items: {
            c: {
              type: 'object',
              items: {
                d: 'number',
                e: 'boolean',
              },
            },
          },
        },
      },
    },
  },
}); assert(result.isValid);
