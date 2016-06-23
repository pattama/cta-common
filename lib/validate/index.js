'use strict';

const _ = require('lodash');
const _typeof = require('./typeof');
const validators = require('./types');

class Validate {
  /**
   * Class Constructor
   * @param input
   * @param pattern
   * @param options
   * @returns {*}
   */
  constructor(input, pattern, options) {
    return this._validate(input, pattern, options);
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

  _validate(input, pattern, options) {
    const that = this;
    let throwErr = false;
    if (_typeof(options) === 'object') {
      if ('throwErr' in options && _typeof(options.throwErr) === 'boolean') {
        throwErr = options.throwErr;
      }
    }
    that._checkPattern(pattern);
    let result = {
      isValid: false,
      output: null,
      results: null,
      error: null,
    };
    const type = _typeof(pattern);
    if (type === 'string') {
      // eg. validate(value, 'number')
      result = that._stringPattern(input, pattern);
    } else if (type === 'object') {
      // eg. validate(value, {type: 'number', optional: true, defaultTo: 0})
      result = that._objectPattern(input, pattern);
    } else if (type === 'array') {
      // eg. validate(value, ['number', 'string'])
      result = that._arrayPattern(input, pattern);
    } else {
      throw new Error('invalid pattern ' + pattern);
    }
    if (result.isValid !== true && throwErr === true) {
      throw new Error(result.error);
    }
    return result;
  }

  /**
   * String pattern
   * @param value
   * @param pattern
   * @returns {object}
   * @private
   */
  _stringPattern(value, pattern) {
    const result = {
      isValid: false,
      error: null,
      output: value,
      pattern: pattern,
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
   * @returns {object}
   * @private
   */
  _arrayPattern(value, patterns) {
    const that = this;
    const result = {
      isValid: false,
      error: null,
      output: value,
      results: [],
      patterns: patterns,
    };
    patterns.forEach(function(pattern) {
      switch (_typeof(pattern)) {
      case 'string':
        result.results.push(that._stringPattern(value, pattern));
        break;
      case 'object':
        result.results.push(that._objectPattern(value, pattern));
        break;
      // TODO add array case?
      default:
        throw new Error(`unknown pattern "${pattern}"`);
      }
    });
    const valids = result.results.filter((e) => {
      return e.isValid === true;
    });
    result.isValid = valids.length > 0;
    if (result.isValid !== true) {
      result.error = _.map(result.results, 'error').join(', ');
    } else {
      result.output = valids[0].output;
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
  _objectPattern(value, pattern) {
    const that = this;
    let result = {
      isValid: false,
      error: null,
      output: null,
      pattern: pattern,
    };
    if (value === undefined) {
      if (pattern.optional === true) {
        result.output = pattern.defaultTo;
        result.isValid = true;
      } else {
        result.error = `missing required element`;
      }
    } else if (!('items' in pattern) && _typeof(pattern.type) === 'string') {
      // eg. validate(value, {type: 'number', optional: true, defaultTo: 0})
      result = that._stringPattern(value, pattern.type);
    } else if (!('items' in pattern) && _typeof(pattern.type) === 'array' && pattern.type.length > 0) {
      // eg. validate(value, {type: ['number', 'string']})
      result = that._arrayPattern(value, pattern.type);
    } else if ('items' in pattern && pattern.type === 'object') {
      // eg. validate(value, {type: 'object', items: {a: 'string'}})
      if (_typeof(value) === 'object') {
        const output = _.cloneDeep(value);
        const results = {};
        if (_typeof(pattern.items) === 'object' && Object.keys(pattern.items).length) {
          // eg. validate(value, {type: 'object', items: {a: 'string'}})
          const items = pattern.items;
          for (const key in items) {
            if (!items.hasOwnProperty(key)) {
              continue;
            }
            const item = items[key];
            results[key] = that._validate(output[key], item);
            output[key] = results[key].output;
          }
          result.isValid = !(_.map(results, 'isValid').indexOf(false) !== -1);
          result.results = results;
          result.output = output;
        } else if (_typeof(pattern.items) === 'array' && pattern.items.length > 0) {
          // eg. validate(value, {type: 'object', items: [{a: 'string'}, {b: 'number'}]})
          result = that._arrayPattern(value, pattern.items);
        } else {
          result.error = 'expected object or array items';
        }
      } else {
        result.error = 'expected object input';
      }
    } else if ('items' in pattern && pattern.type === 'array') {
      // eg. validate(value, {type: 'array', items: ['string', 'number']})
      if (_typeof(value) === 'array') {
        const results = [];
        value.forEach((e) => {
          results.push(that._validate(e, pattern.items));
        });
        result.isValid = !(_.map(results, 'isValid').indexOf(false) !== -1);
        if (result.isValid === true) {
          result.output = _.map(results, 'output');
        }
      } else {
        result.error = 'expected array input';
      }
    }
    return result;
  }

}

module.exports = Validate;
