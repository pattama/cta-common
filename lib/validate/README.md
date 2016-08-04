# validate module

## Features

This module validates an input object according to a pattern object.

- It checks that all mandatory fields in the pattern are present if the input
- It checks that field types in the input fit those in the pattern
- It sets optional fields in the input to their default values provided in the pattern

## How to use it

Require it

````javascript
const validate = require('cta-common').validate;
````

Then you can call it with 2 or 3 parameters

- First parameter is the object you want to validate
- Second parameter is the pattern
- Third parameter is an optional object that currently support 'throwErr' option. It controls the behaviour of the module. Either to throw an error if the input is invalid or just return a boolean flag 'isValid' 

### throw on error

````javascript
validate({key: 'abc', value: 'def'}, {key: 'string', value: 'integer'}); // will throw an error
console.log('valid object');
````

````javascript
validate({key: 'abc', value: 123}, {key: 'string', value: 'integer'}); // will return an object
console.log('valid object');
````

### don't throw on error

````javascript
const result = validate({key: 'abc', value: 'def'}, {key: 'string', value: 'integer'}, {throwErr: false}); // will return an object
if (result.isValid) { // true
    console.log('valid object');
}
````

````javascript
const result = validate({key: 'abc', value: 123}, {key: 'string', value: 'integer'}, {throwErr: false}); // will return an object
if (result.isValid) { // false
    console.log('valid object');
}
````

### optional fields

````javascript
const pattern = {
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
const result = validate({key: 'abc'}, pattern);
/*
result = {
    isValid: true,    
    output: {
        key: 'abc',
        value: {
            a: 1,
            b: 2,
        },
    },
    ...
}
*/
````

Here result.output is the validated input with optional fields set to their default