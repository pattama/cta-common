'use strict';

const o = require('../../common');

const pattern = require('./index.bricks.testdata/pattern');
const input1 = require('./index.bricks.testdata/input1.ok');
const input2 = require('./index.bricks.testdata/input2.ok');
const input3 = require('./index.bricks.testdata/input3.nok');
const input4 = require('./index.bricks.testdata/input4.nok');
const input5 = require('./index.bricks.testdata/input5.nok');

describe('validate: cta flowcontrol config', function () {
  it('valid config (1)', function () {
    const result = o.validate(input1, pattern);
    o.assert.isOk(result.isValid);
  });
  it('valid config (2)', function () {
    const result = o.validate(input2, pattern);
    o.assert.isOk(result.isValid);
  });
  it('invalid config (3)', function () {
    const result = o.validate(input3, pattern);
    o.assert.isNotOk(result.isValid);
  });
  it('invalid config (4)', function () {
    const result = o.validate(input4, pattern);
    o.assert.isNotOk(result.isValid);
  });
  it('invalid config (5)', function () {
    const result = o.validate(input5, pattern);
    o.assert.isNotOk(result.isValid);
  });
});
