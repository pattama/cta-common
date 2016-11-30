'use strict';

const o = require('../../common');
const _typeof = require('../../../lib/validate/typeof');

describe('validate: typeof', function () {
  it('null', function () {
    o.assert.strictEqual(_typeof(null), 'null');
  });
  it('global', function () {
    o.assert.strictEqual(_typeof(global), 'global');
  });
  it('string', function () {
    o.assert.strictEqual(_typeof('abc'), 'string');
  });
  it('boolean', function () {
    o.assert.strictEqual(_typeof(true), 'boolean');
    o.assert.strictEqual(_typeof(false), 'boolean');
  });
  it('number', function () {
    o.assert.strictEqual(_typeof(123), 'number');
    o.assert.strictEqual(_typeof(0), 'number');
  });
  it('undefined', function () {
    o.assert.strictEqual(_typeof(undefined), 'undefined');
  });
  it('function', function () {
    o.assert.strictEqual(_typeof(function () {
      return true;
    }), 'function');
  });
  it('date', function () {
    o.assert.strictEqual(_typeof(new Date()), 'date');
  });
  it('regexp', function () {
    o.assert.strictEqual(_typeof(new RegExp('\\w+')), 'regexp');
  });
  it('error', function () {
    o.assert.strictEqual(_typeof(new Error('fatal error')), 'error');
  });
  it('object', function () {
    o.assert.strictEqual(_typeof({ a: 1, b: 2 }), 'object');
  });
  it('array', function () {
    o.assert.strictEqual(_typeof([1, 'a']), 'array');
  });
});
