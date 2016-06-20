'use strict';

const _ = require('lodash');
const validators = require('./types');

class Validate {
  /**
   * Constructor
   * @param input
   * @param pattern
   */
  constructor(input, pattern) {
    if ( !(typeof pattern === 'object' && pattern !== null && !Array.isArray(pattern) && Object.keys(pattern).length > 0) ) {
      throw new Error('invalid pattern object');
    }
    return this._validate(input, pattern);
  }

  _validate(input, pattern) {
    const that = this;
    const results = {};
    for (const key in pattern) {
      if (!pattern.hasOwnProperty(key)) {
        continue;
      }
      const pv = pattern[key];
      if (typeof pv === 'string') {
        results[key] = that._string(key, input[key], pattern[key]);
      } else if (Array.isArray(pv)) {
        results[key] = that._array(key, input[key], pattern[key]);
      } else if (typeof pv === 'object' && Object.keys(pv)) {
        results[key] = that._object(key, input, pattern[key]);
      } else {
        throw new Error(`unknown pattern for key "${key}", should be string|array|object`);
      }
    }
    const isValid = !(_.map(results, 'isValid').indexOf(false) !== -1);
    return {
      isValid: isValid,
      results: results,
      output: input,
    };
  }

  /**
   * String pattern
   * @param key
   * @param value
   * @param pattern
   * @returns {{isValid: boolean, error: string}}
   * @private
   */
  _string(key, value, pattern) {
    const result = {
      isValid: false,
      error: '',
    };
    if (!(pattern in validators)) {
      throw new Error(`unknown pattern type "${pattern}"`);
    } else {
      result.isValid = validators[pattern](value);
    }
    if (result.isValid !== true) {
      result.error = `invalid type for key "${key}", provided "${typeof value}", expected "${pattern}"`;
    }
    return result;
  }

  /**
   * Array pattern
   * @param key
   * @param value
   * @param patterns
   * @returns {{isValid: boolean, error: string}}
   * @private
   */
  _array(key, value, patterns) {
    const that = this;
    const result = {
      isValid: false,
      error: '',
    };
    const results = [];
    patterns.forEach(function(pattern) {
      switch (typeof pattern) {
      case 'string':
        results.push(that._string(key, value, pattern));
        break;
      case 'object':
        results.push(that._object(key, value, pattern));
        break;
      default:
        throw new Error(`unknown pattern "${pattern}"`);
      }
    });
    result.isValid = _.map(results, 'isValid').filter((e) => {
      return e === true;
    }).length > 0;
    if (!result.isValid) {
      result.error = _.map(results, 'error').join(', ');
    }
    return result;
  }

  /**
   * Object pattern
   * @param key
   * @param input
   * @param obj
   * @returns {{isValid: boolean, error: string}}
   * @private
   */
  _object(key, input, obj) {
    const that = this;
    let result = {
      isValid: false,
      error: '',
    };
    if (!(key in input)) {
      if (obj.optional === true) {
        input[key] = obj.defaultTo;
        result.isValid = true;
      } else {
        result.error = `missing required key "${key}"`;
      }
    } else if (!('items' in obj)) {
      result = that._string(key, input[key], obj.type);
    } else if ('items' in obj && obj.type === 'object') {
      result = that._validate(input[key], obj.items);
    } else if ('items' in obj && obj.type === 'array') {
      // TODO
    }
    return result;
  }

}

module.exports = Validate;
