'use strict';

const assert = require('chai').assert;
const types = require('../../lib/validate/types');

describe('validate / types', function() {
  it('valid string', function() {
    assert.strictEqual(types.string('abc'), true);
  });
  it('invalid string', function() {
    assert.strictEqual(types.string(123), false);
  });

  it('valid number', function() {
    assert.strictEqual(types.number(123), true);
  });
  it('invalid number', function() {
    assert.strictEqual(types.number('abc'), false);
  });

  it('valid array', function() {
    assert.strictEqual(types.array([]), true);
    assert.strictEqual(types.array([1, 2]), true);
  });
  it('invalid array', function() {
    assert.strictEqual(types.array({a: 1}), false);
    assert.strictEqual(types.array(123), false);
  });

  it('valid object', function() {
    assert.strictEqual(types.object({}), true);
    assert.strictEqual(types.object({a: 1}), true);
  });
  it('invalid object', function() {
    assert.strictEqual(types.object([]), false, 'we do not consider here "Array" as object');
    assert.strictEqual(types.object(null), false, 'we do not consider here "null" as object');
    assert.strictEqual(types.object(function(){}), false);
    assert.strictEqual(types.object('abc'), false);
  });

  it('valid dir', function() {
    assert.strictEqual(types.dir(__dirname), true);
  });
  it('invalid dir', function() {
    assert.strictEqual(types.dir('foo/bar'), false);
  });

  it('valid file', function() {
    assert.strictEqual(types.file(__filename), true);
  });
  it('invalid file', function() {
    assert.strictEqual(types.file('foo/bar'), false);
  });
});

