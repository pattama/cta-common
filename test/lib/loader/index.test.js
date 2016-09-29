'use strict';

const o = require('../../common');

describe('loader', () => {
  describe('asArray', () => {
    it('should throw an error', () => {
      try {
        o.loader.asArray('notfound');
        o.assert.fail('should not be here');
      } catch (e) {
        o.assert(e);
      }
    });
    it('should load array elements', () => {
      const arr = o.loader.asArray('index.testdata', __dirname);
      o.assert.deepEqual(arr, [{
        a: 1,
        order: 1,
      }, {
        b: 2,
        order: 2,
      }, {
        c: 3,
        order: 3,
      }]);
    });
  });
});
