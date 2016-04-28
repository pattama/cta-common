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
    if (!(field in input)) {
      if (!optional) {
        result.error = `missing parameter "${field}"`;
        return result;
      } else if ('defaultTo' in oType) {
        result.output[field] = oType.defaultTo;
      }
    } else {
      if (typeof input[field] !== type) {
        result.error = `invalid parameter type "${field}", provided "${typeof input[field]}", expected "${type}"`;
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
