'use strict';

const _ = require('lodash');
const _typeof = require('./typeof');
const validators = require('./types');

class Validate {
  /**
   * Constructor
   * @param input
   * @param pattern
   */
  constructor(input, pattern) {
    return this._validate(input, pattern);
  }

  _checkPattern(pattern) {
    let isValid = false;
    const type = _typeof(pattern);
    isValid = isValid || (type === 'string');
    isValid = isValid || (type === 'object' && Object.keys(pattern).length > 0);
    isValid = isValid || (type === 'array' && pattern.length > 0);
    if (!isValid) {
      throw new Error(`invalid pattern object "${pattern}", should be string|array|object (non empty)`);
    }
  }

  _validate(input, pattern) {
    const that = this;
    that._checkPattern(pattern);
    let result = {
      isValid: false,
      output: null,
      results: null,
    };

    // Object input --------------------------------------------------------
    if (_typeof(input) === 'object' && Object.keys(input).length > 0) {
      const output = _.cloneDeep(input);
      const items = pattern.items; // TODO check pattern.items
      const results = {};
      for (const key in items) {
        if (!items.hasOwnProperty(key)) {
          continue;
        }
        const item = items[key];
        results[key] = that._validate(output[key], item);
      }
      result.isValid = !(_.map(results, 'isValid').indexOf(false) !== -1);
      result.results = results;
      result.output = output;

    // Array input --------------------------------------------------------
    } else if (_typeof(input) === 'array') {
      const output = _.cloneDeep(input);
      const items = pattern.items; // TODO check pattern.items
      const results = {};
      output.forEach((value, key) => {
        results[key] = that._validate(value, items);
      });
      result.isValid = !(_.map(results, 'isValid').indexOf(false) !== -1);
      result.results = results;
      result.output = output;

    // Otherwise --------------------------------------------------------
    } else {
      if (_typeof(pattern) === 'string') {
        result = that._string(input, pattern);
      } else if (Array.isArray(pattern)) {
        result = that._array(input, pattern);
      } else if (_typeof(pattern) === 'object' && Object.keys(pattern).length) {
        result = that._object(input, pattern);
      } else {
        throw new Error(`unknown pattern "${pattern}", should be string|array|object`);
      }
    }
    return result;
  }

  /**
   * String pattern
   * @param value
   * @param pattern
   * @returns {{isValid: boolean, error: string}}
   * @private
   */
  _string(value, pattern) {
    const result = {
      isValid: false,
      error: '',
    };
    result.isValid = validators(value, pattern);
    if (result.isValid !== true) {
      result.error = `invalid type for value "${value}", provided "${_typeof(value)}", expected "${pattern}"`;
    }
    return result;
  }

  /**
   * Array pattern
   * @param value
   * @param patterns
   * @returns {{isValid: boolean, error: string}}
   * @private
   */
  _array(value, patterns) {
    const that = this;
    const result = {
      isValid: false,
      error: '',
    };
    const results = [];
    patterns.forEach(function(pattern) {
      switch (_typeof(pattern)) {
      case 'string':
        results.push(that._string(value, pattern));
        break;
      case 'object':
        results.push(that._object(value, pattern));
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
   * @param value
   * @param pattern
   * @returns {{isValid: boolean, error: string}}
   * @private
   */
  _object(value, pattern) {
    const that = this;
    let result = {
      isValid: false,
      error: '',
      output: null,
    };
    if (value === undefined) {
      if (pattern.optional === true) {
        result.output = pattern.defaultTo;
        result.isValid = true;
      } else {
        result.error = `missing required element`;
      }
    } else if (!('items' in pattern) && _typeof(pattern.type) === 'string') {
      result = that._string(value, pattern.type);
    } else if (!('items' in pattern) && Array.isArray(pattern.type)) {
      result = that._array(value, pattern.type);
    } else if ('items' in pattern && pattern.type === 'object') {
      result = that._validate(value, pattern.items);
    } else if ('items' in pattern && pattern.type === 'array') {
      const res = that._string(value, 'array');
      if (res.isValid !== true) {
        result = res;
      } else {
        const results = [];
        value.forEach(function(e) {
          results.push(that._validate(e, pattern.items));
        });
        result.isValid = !(_.map(results, 'isValid').indexOf(false) !== -1);
      }
    }
    return result;
  }

}

module.exports = Validate;
