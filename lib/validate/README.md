# validate module

This module validates an input value according to a pattern.

It supports validating objects with high depth level of properties.

## How to use it

````javascript
// Require it
const validate = require('cta-common').validate;
// Then you can call it with 2 or 3 parameters
const result = validate(input, pattern, options);
````

### arguments

- First parameter is the value you want to validate
- Second parameter is the validation pattern
- Third parameter is an optional object of options:
  * option 'throwErr': Default to false. If set to true, it will throw an error if the input is not matching the pattern. If set to false, you need to check the validation result and decide what to do...

````javascript
result = validate(input, pattern, {throwErr: true}); // this will throw an error if the input is not matching
result = validate(input, pattern); // you need to check the result to know if the input is matching or not, see below
````

### return

This module returns an object with these keys :
  * isValid: is a boolean, true if the input is valid, false if not
  * output: is the validated input, useful when the input is optional (or has some optional properties) to return provided default value
  * results: is the validation results for complex inputs (each element for array inputs, and each key for object inputs)
  * error: is the error message when the validation fails

## Validation patterns

A pattern can be one of these types (string, array, object):

- string pattern: this is the basic pattern, it validates that the input type is matching the type in pattern. Examples:

````javascript
const assert = require('chai').assert;
const validate = require('cta-common').validate;
let result;
result = validate('/tmp', 'dir'); assert(result.isValid);
result = validate('/tmp/out.log', 'file'); assert(result.isValid);
````

- object pattern: this is an advanced pattern, it validates the input with some advanced features. Pattern keys:
  * type {string}: is the string pattern, see previous section. Example:

````javascript
result = validate('/var/log', {type: 'dir'});
````

  * optional {true/false}: if set to true, then the input is optional. By default, all inputs are mandatory
  * defaultTo {any}: used in conjunction with optional, if input is not defined then it is set to this default value. Example:

````javascript
function(path) {  
  const _path = validate(path, {type: 'dir', optional: true, defaultTo: '/tmp'}).output;
  ...
}
````

  * items {pattern}: if the input is an array/object, then this is the pattern of each element/key

````javascript
result = validate({a: 123, b: 'abc'}, {type: 'object', items: {a: 'number', b: 'string'}});
result = validate(['abc', 'def'], {type: 'array', items: 'string'});
````
     
  * unique {true/false}: used for array types, if set to true then array elements should be unique. Example:

````javascript
// simple usage
result = validate(['abc', 'def'], {type: 'array', items: 'string', unique: true});
// complex usage
result = validate([{a: 'x', b: 1}, {a: 'y', b: 2}], {type: 'array', items: {
    type: 'object',
    items: {
        a: { type: 'string', unique: true },
        b: 'number',
    },
}});
````

- array pattern: this is the most advanced pattern, since it can combine string and object patterns. It validates that the input is matching at least one of the patterns in the array. Examples:

````javascript
result = validate('abc', ['string', 'number']); assert(result.isValid);
result = validate({a: 123}, [{type: 'object', items: {a: 'number'}}, 'string']); assert(result.isValid);
result = validate('abc', [{type: 'object', items: {a: 'number'}}, 'string']); assert(result.isValid);
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
const validate = require('cta-common').validate;
let result;

result = validate('abc', ['string', 'number']); assert(result.isValid);
result = validate(123, ['string', 'number']); assert(result.isValid);
result = validate(true, ['string', 'number']); assert(!result.isValid);

result = validate(undefined, {type: 'string', optional: true, defaultTo: 'abc'}); assert(result.isValid); assert.strictEqual(result.output, 'abc');
result = validate(123, {type: 'string', optional: true, defaultTo: 'abc'}); assert(!result.isValid);
result = validate(['abc', 'def'], {type: 'array', items: 'string'}); assert(result.isValid);
result = validate(['abc', 123], {type: 'array', items: ['string', 'number']}); assert(result.isValid);
result = validate(['abc', 123, true], {type: 'array', items: ['string', 'number']}); assert(!result.isValid);

result = validate({a: 123, b: 'abc'}, {type: 'object', items: {a: 'number', b: 'string'}}); assert(result.isValid);
result = validate({a: 123, b: true}, {type: 'object', items: {a: 'number', b: ['string', 'boolean']}}); assert(result.isValid);
result = validate({a: 123, b: { c: 456, d: [789, true]}}, {
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
result = validate({a: 123, b: { c: 456, d: [789, 'abc']}}, {
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
result = validate({a: {b: {c: {d: 1, e: true}}}}, {
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

## Roadmap

- Allow usage of custom/vendor validators. Example:

````javascript
const validator = require('validator');
const result = validate({
  name: 'someone',
  email: 'foo@bar.com'
}, {
  type: 'object',
  items: {
    name: 'string',
    email: {
      type: 'custom',
      isValid: (input) => {
        return validator.isEmail(input);
      }
    }
  },
})
````

- Allow short syntax for patterns. Example:

````javascript
validate('abc', ['string', 'number']);
// => validate('abc', 'string|number') 

validate({a: 'b', c: 1}, {type: 'object', items: {a: 'string', b: ['number', 'string']}};
// => validate({a: 'b', c: 1}, '{a:string,c:number|string}') 

validate([1, 2, 3], {type: 'array', items: 'number'};
// => validate([1, 2, 3], '[number]')

validate([{a: 'a', b: 1}, {a: 'b', b: 2}], {
 type: 'array',
 items: {
   type: 'object',
   items: {
     a: {
       type: 'string',
       unique: true,
     },
     b: 'number',
   },
 },
}
// => validate([{a: 'a', b: 1}, {a: 'b', b: 2}], '[{a:string*,b:number}]')
````