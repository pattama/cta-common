'use strict';

const o = require('../../common');
const A = require('./index.testdata/classes/a');
const B = require('./index.testdata/classes/b');

describe('loader', function () {
  describe('asArray', function () {
    it('should throw an error', function () {
      try {
        o.loader.asArray('notfound');
        o.assert.fail('should not be here');
      } catch (e) {
        o.assert(e);
      }
    });
    it('should load array elements', function () {
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
  describe('asObject', function () {
    it('should load object element', function () {
      const dir = o.path.join(__dirname, 'index.testdata', 'classes');
      const obj = o.loader.asObject(dir);
      const ClassA = obj.a;
      const ClassB = obj.b;
      const a = new ClassA();
      const b = new ClassB();
      o.assert.instanceOf(a, A);
      o.assert.instanceOf(b, B);
    });
  });
});
