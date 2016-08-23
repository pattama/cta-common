'use strict';

const o = require('../../common');
const ObjectID = require('bson').ObjectID;
const types = require('../../../lib/validate/types');

describe('validate: types', function() {
  it('dir', function() {
    o.assert.isOk(types(__dirname, 'dir'));
    o.assert.isNotOk(types('foo/bar', 'dir'));
  });

  it('file', function() {
    o.assert.isOk(types(__filename, 'file'));
    o.assert.isNotOk(types('foo/bar', 'file'));
  });

  it('objectid', function() {
    const id = (new ObjectID()).toString();
    o.assert.isOk(types(id, 'objectid'));
    o.assert.isNotOk(types('111', 'objectid'));
  });
});
