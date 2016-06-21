'use strict';

const assert = require('chai').assert;
const types = require('../../lib/validate/types');

describe('validate: types', function() {
  it('dir', function() {
    assert.isOk(types(__dirname, 'dir'));
    assert.isNotOk(types('foo/bar', 'dir'));
  });

  it('file', function() {
    assert.isOk(types(__filename, 'file'));
    assert.isNotOk(types('foo/bar', 'file'));
  });
});

