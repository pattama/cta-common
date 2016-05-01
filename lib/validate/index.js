'use strict';

const _ = require('lodash');
const types = require('./types');

/**
 * Validate an input object parameters with provided object pattern
 * @param {object} input - input object parameters
 * @param {object} pattern - pattern object
 * @param {object} options - options
 * @param {boolean} options.throwErr - throw an error if invalid input
 * @return {object} result - object
 * {boolean} result.isValid - true if input is valid, false if not
 * {object} result.output - validated input
 * {string} result.error - validation error message
 */

function validate(input, pattern, options) {
  const result = {
    isValid: false,
    error: '',
    output: {},
    // default options
    options: {
      throwErr: true,
    },
  };

  // user's options
  if (typeof options === 'object') {
    if ('throwErr' in options && typeof options.throwErr === 'boolean') {
      result.options.throwErr = options.throwErr;
    }
  }

  // validate pattern
  if ( !(typeof pattern === 'object' && pattern !== null && !Array.isArray(pattern) && Object.keys(pattern).length > 0) ) {
    result.error = 'invalid pattern object';
    return result;
  }

  // validate number of mandatory (non optional) fields for null/non object input
  let optionals = 0;
  Object.keys(pattern).forEach(function(e) {
    if (typeof pattern[e] === 'object' && pattern[e].optional === true) {
      optionals++;
    }
  });
  if (input === null || typeof input !== 'object') {
    input = {};
    if (Object.keys(pattern).length !== optionals) {
      result.error = 'invalid input object';
      return result;
    }
  }

  result.output = _.cloneDeep(input);

  // validate input fields
  for (const field in pattern) {
    if (!pattern.hasOwnProperty(field)) {
      continue;
    }
    const oType = pattern[field];
    let type;
    let optional = false;
    if (typeof oType === 'object') {
      type = oType.type;
      optional = oType.optional;
    } else if (typeof oType === 'string') {
      type = oType;
    } else {
      result.error = 'invalid pattern';
      return result;
    }
    if ( !(type in types) ) {
      result.error = `unknown pattern type "${type}"`;
      return result;
    }
    if (!(field in input)) {
      if (!optional) {
        result.error = `missing parameter "${field}"`;
        return result;
      } else if ('defaultTo' in oType) {
        result.output[field] = oType.defaultTo;
      }
    } else {
      if (!types[type](input[field])) {
        result.error = `invalid parameter type "${field}", provided "${typeof input[field]}", expected "${type}"`;
        return result;
      }
    }
  }
  result.isValid = true;
  return result;
}

exports = module.exports = function(input, pattern, options) {
  const result = validate(input, pattern, options);
  result.error = result.error ? 'validate module => ' + result.error : '';
  if (!result.isValid && result.options.throwErr) {
    throw new Error(result.error);
  }
  return result;
};
