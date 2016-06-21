'use strict';

const assert = require('chai').assert;
const _typeof = require('../../lib/validate/typeof');

describe('validate: typeof', function() {
  it('null', function() {
    assert.strictEqual(_typeof(null), 'null');
  });
  it('global', function() {
    assert.strictEqual(_typeof(global), 'global');
  });
  it('string', function() {
    assert.strictEqual(_typeof('abc'), 'string');
  });
  it('boolean', function() {
    assert.strictEqual(_typeof(true), 'boolean');
    assert.strictEqual(_typeof(false), 'boolean');
  });
  it('number', function() {
    assert.strictEqual(_typeof(123), 'number');
    assert.strictEqual(_typeof(0), 'number');
  });
  it('undefined', function() {
    assert.strictEqual(_typeof(undefined), 'undefined');
  });
  it('function', function() {
    assert.strictEqual(_typeof(function() {
      return true;
    }), 'function');
  });
  it('date', function() {
    assert.strictEqual(_typeof(new Date()), 'date');
  });
  it('regexp', function() {
    assert.strictEqual(_typeof(new RegExp('\\w+')), 'regexp');
  });
  it('error', function() {
    assert.strictEqual(_typeof(new Error('fatal error')), 'error');
  });
  it('object', function() {
    assert.strictEqual(_typeof({a: 1, b: 2}), 'object');
  });
  it('array', function() {
    assert.strictEqual(_typeof([1, 'a']), 'array');
  });
});
