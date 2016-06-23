# validate module

This module validates an input value according to a pattern.

## How to use it

Require it

````javascript
const Validate = require('cta-tools').validate;
````

Then you can call it with 2 or 3 parameters

````javascript
const result = new Validate(input, pattern, options);
````

- First parameter is the value you want to validate
- Second parameter is the validation pattern
- Third parameter is an optional object that currently support 'throwErr' option. If it is set to true, it will throw an error if the input is not matching the pattern.

````javascript
result = new Validate(input, pattern, {throwErr: true}); // will throw an error
result = new Validate(input, pattern); // will not throw an error
````

- This module returns an object:
  * isValid: is a boolean, true if the input is valid
  * output: is the validated input, useful when the input is optional, to return a default value
  * results: is the validation results for complex inputs, each element for array inputs, and each key for object inputs
  * error: error message when the validation fails,

## Pattern

A pattern can be one of these types (string, array, object):

- string pattern: it validates that the input is matching the pattern. Examples:

````javascript
const assert = require('chai').assert;
const Validate = require('cta-tools').validate;
let result;
result = new Validate(123, 'number'); assert(result.isValid);
result = new Validate('abc', 'boolean'); assert(!result.isValid);
````

- object pattern: it validates the input with advanced features
  * type {string}: is the string pattern

````javascript
result = new Validate(123, {type: 'number'});
````

  * optional {true/false}: if true, then the input is optional. By default, all inputs are mandatory
  * defaultTo {any}: used in conjunction with optional, if input is not defined then it is set to a default value

````javascript
result = new Validate(undefined, {type: 'string', optional: true, defaultTo: 'abc'});
````

  * items {pattern}: if the input is an array/object, then this is the pattern of each element/key

````javascript
result = new Validate({a: 123, b: 'abc'}, {type: 'object', items: {a: 'number', b: 'string'}});
result = new Validate(['abc', 'def'], {type: 'array', items: 'string'});
````
     
  * unique {true/false}: if true and the input type is an array, array elements should be unique.
    If the input type is an object inside an array, and 'unique' is set against a property then the property should be unique (see samples)

````javascript
result = new Validate(['abc', 'def'], {type: 'array', items: 'string', unique: true});
result = new Validate([{a: 'x', b: 1}, {a: 'y', b: 2}], {type: 'array', items: {
    type: 'object',
    items: {
        a: { type: 'string', unique: true },
        b: 'number',
    },
}});
````

- array pattern: it validates that the input is matching at least one of the patterns in the array

````javascript
result = new Validate('abc', ['string', 'number']); assert(result.isValid);
result = new Validate({a: 123}, [{type: 'object', items: {a: 'number'}}, 'string']); assert(result.isValid);
result = new Validate('abc', [{type: 'object', items: {a: 'number'}}, 'string']); assert(result.isValid);
````

## Features

- If the input is an array, and the pattern is an object with 'items' property, it will check that each element of the array is matching the items pattern
- If the input is an object, and the pattern is an object with 'items' property:
  * it checks that each key of the object is matching the items pattern
  * it checks that all mandatory keys in the pattern are present in the input
  * if a key is optional and not defined, it is set to its default

## Examples

````javascript
'use strict';

const assert = require('chai').assert;
const Validate = require('cta-tools').validate;
let result;

result = new Validate('abc', 'string'); assert(result.isValid);
result = new Validate(123, 'string'); assert(!result.isValid);

result = new Validate('abc', ['string', 'number']); assert(result.isValid);
result = new Validate(123, ['string', 'number']); assert(result.isValid);
result = new Validate(true, ['string', 'number']); assert(!result.isValid);

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

````

For more examples, see tests