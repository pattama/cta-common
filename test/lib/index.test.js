'use strict';

const o = require('../common');

describe('index', () => {
  it('should exports main modules', () => {
    o.assert.property(o.lib, 'validate');
    o.assert.strictEqual(typeof o.lib.validate, 'function');
    o.assert.property(o.lib, 'loader');
    o.assert.property(o.lib, 'root');
    o.assert.strictEqual(typeof o.lib.root, 'function');
  });
});
