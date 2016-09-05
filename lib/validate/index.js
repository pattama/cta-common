'use strict';

const _ = require('lodash');
const _typeof = require('./typeof');
const validators = require('./types');

class Validate {
  /**
   * Class Constructor
   */
  constructor() {
  }

  /**
   * main validation method
   * @param input
   * @param pattern
   * @param options
   * @returns {{isValid: boolean, output: null, results: null, error: null}}
   */
  validate(input, pattern, options) {
    const that = this;
    let throwErr = false;
    if (_typeof(options) === 'object') {
      if ('throwErr' in options && _typeof(options.throwErr) === 'boolean') {
        throwErr = options.throwErr;
      }
    }
    let isValid = false;
    const patternType = _typeof(pattern);
    isValid = isValid || (patternType === 'string');
    isValid = isValid || (patternType === 'object' && Object.keys(pattern).length > 0);
    isValid = isValid || (patternType === 'array' && pattern.length > 0);
    if (!isValid) {
      throw new Error(`invalid pattern "${pattern}", should be string|array|object (non empty)`);
    }
    let result = {
      isValid: false,
      output: null,
      results: null,
      error: null,
    };
    if (patternType === 'string') {
      // eg. validate(value, 'number')
      result = that._stringPattern(input, pattern);
    } else if (patternType === 'object') {
      // eg1. validate(value, {type: 'number', optional: true, defaultTo: 0})
      // eg2. validate(value, {type: 'object', items: {a: 'number', b: 'string'}})
      result = that._objectPattern(input, pattern);
    } else if (patternType === 'array') {
      // eg. validate(value, ['number', 'string'])
      result = that._arrayPattern(input, pattern);
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
      result.error = `invalid type for value "${value}", expected "${pattern}"`;
    }
    return result;
  }

  /**
   * Custom validator method
   * Used by _objectPattern when pattern.type==='custom'
   * Calls pattern.validator to validate the input value
   * @param value
   * @param pattern
   * @param {function} pattern.validator
   * @returns {object}
   * @private
   */
  _customValidator(value, pattern) {
    const result = {
      isValid: false,
      error: null,
      output: value,
      pattern: pattern,
    };

    if (typeof pattern.validator !== 'function') {
      throw new Error(`custom validator is not a function for value ${value}`);
    }

    const patternResult = pattern.validator(value);

    if (typeof patternResult !== 'object') {
      throw new Error(`incorrect object response from custom validator for value ${value}`);
    }
    if (typeof patternResult.isValid !== 'boolean') {
      throw new Error(`incorrect boolean response.isValid from custom validator for value ${value}`);
    }
    if (patternResult.hasOwnProperty('error') && !(patternResult.error instanceof Error)) {
      throw new Error(`incorrect Error response.error from custom validator for value ${value}`);
    }
    result.isValid = patternResult.isValid;

    if (result.isValid !== true) {
      result.error = `invalid type for value "${value}", custom validator returned error: ${patternResult.error.message}`;
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
      results: [],
      unique: {},
    };
    if ( (value === undefined || value === null) && pattern.optional === true ) {
      // eg. validate(null, {type: 'number', optional: true, defaultTo: 0})
      if (pattern.hasOwnProperty('defaultTo')) {
        result.output = pattern.defaultTo;
        result.isValid = true;
      } else if (pattern.hasOwnProperty('items')) {
        const _value = pattern.type === 'object' ? {} : [];
        result = that._objectPattern(_value, pattern);
      } else {
        result.isValid = true;
      }
    } else if ( (value === undefined || value === null) && pattern.optional !== true) {
      result.error = 'missing required element';
    } else if (!('items' in pattern) && _typeof(pattern.type) === 'string') {
      // eg. validate(123, {type: 'number', optional: true, defaultTo: 0})
      if (pattern.type === 'custom') {
        result = that._customValidator(value, pattern);
      } else {
        result = that._stringPattern(value, pattern.type);
      }
    } else if (!('items' in pattern) && _typeof(pattern.type) === 'array' && pattern.type.length > 0) {
      // eg. validate(123, {type: ['number', 'string']})
      result = that._arrayPattern(value, pattern.type);
    } else if ('items' in pattern && pattern.type === 'object') {
      // eg. validate(value, {type: 'object', items: {a: 'string'}})
      if (_typeof(value) !== 'object' && pattern.optional !== true) {
        result.error = 'expected object input';
      } else {
        const output = _typeof(value) === 'object' ? _.cloneDeep(value) : {};
        const results = {};
        if (_typeof(pattern.items) === 'object' && Object.keys(pattern.items).length) {
          // eg. validate(value, {type: 'object', items: {a: 'string'}})
          const items = pattern.items;
          Object.keys(items).forEach((key) => {
            const item = items[key];
            results[key] = that.validate(output[key], item);
            if (results[key].output !== null) {
              output[key] = results[key].output;
            }
            if (item.unique) {
              result.unique[key] = output[key];
            }
          });
          result.isValid = !(_.map(results, 'isValid').indexOf(false) !== -1);
          result.results = results;
          result.output = output;
        } else if (_typeof(pattern.items) === 'array' && pattern.items.length > 0) {
          // eg. validate(value, {type: 'object', items: [{a: 'string'}, {b: 'number'}]})
          result = that._arrayPattern(value, pattern.items);
        } else {
          throw new Error('invalid pattern, expected array or object');
        }
      }
    } else if ('items' in pattern && pattern.type === 'array') {
      // eg. validate(value, {type: 'array', items: ['string', 'number']})
      if (_typeof(value) === 'array') {
        if (pattern.unique === true) {
          const copy = _.uniqWith(value, _.isEqual);
          if (value.length > copy.length) {
            result.error = `expected unique elements, found ${value.length - copy.length} redundant(s)`;
          }
        }
        if (result.error === null) {
          value.forEach((e) => {
            const res = that.validate(e, pattern.items);
            result.results.push(res);
            if (_typeof(res.unique) === 'object') {
              Object.keys(res.unique).forEach((k) => {
                if (!(k in result.unique)) {
                  result.unique[k] = [];
                }
                result.unique[k].push(res.unique[k]);
              });
            }
          });
          const uniqueErr = [];
          Object.keys(result.unique).forEach((k) => {
            const copy = _.uniqWith(result.unique[k], _.isEqual);
            if (result.unique[k].length > copy.length) {
              uniqueErr.push(`expected unique property, found ${result.unique[k].length - copy.length} redundant(s)`);
            }
          });
          if (uniqueErr.length === 0) {
            result.isValid = !(_.map(result.results, 'isValid').indexOf(false) !== -1);
          }
          if (result.isValid === true) {
            result.output = _.map(result.results, 'output');
          }
        }
      } else {
        result.error = 'expected array input';
      }
    }
    return result;
  }
}

module.exports = new Validate();
