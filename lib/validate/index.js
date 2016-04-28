'use strict';

const _ = require('lodash');

/**
 * Validate an input object parameters with provided object pattern
 * @param {object} input - input object parameters
 * @param {object} pattern - pattern object
 * @param {object} options - optinos
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

  // validate pattern existence
  if (typeof pattern !== 'object') {
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
    if (Object.keys(pattern).length !== optionals) {
      result.error = 'invalid input object';
      return result;
    }
  }

  result.output = _.cloneDeep(input);

  // validate input fields
  for (const key in pattern) {
    if (!pattern.hasOwnProperty(key)) {
      continue;
    }
    const val = pattern[key];
    if (!(key in input)) {
      // is it mandatory?
      if (typeof val === 'string') {
        result.error = `missing parameter "${key}"`;
        return result;
        // is it optional?
      } else if (val.optional && 'defaultTo' in val) {
        result.output[key] = val.defaultTo;
      }
    } else {
      const type = (typeof val === 'string') ? val : val.type;
      if (typeof input[key] !== type) {
        result.error = `invalid parameter type "${key}", provided "${typeof input[key]}", expected "${type}"`;
        return result;
      }
    }
  }
  result.error = result.error ? 'validate module => ' + result.error : '';
  result.isValid = true;
  return result;
}

exports = module.exports = function(input, pattern, options) {
  const result = validate(input, pattern, options);
  if (!result.isValid && result.options.throw) {
    throw new Error(result.error);
  }
  return result;
};
