'use strict';

const o = require('../common');

describe('index', () => {
  it('should exports main modules', () => {
    o.assert.property(o.tools, 'validate');
    o.assert.strictEqual(typeof o.tools.validate, 'function');
  });
});
