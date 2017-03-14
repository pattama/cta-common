'use strict';

const config = require('../../../lib/config');
const loader = require('../../../lib/loader');
const o = require('../../common');
const configs = {
  tools: require('./config.testdata/tools'),
  bricks: require('./config.testdata/bricks'),
  one: require('./config.testdata/extended/one'),
  two: require('./config.testdata/extended/two'),
  three: require('./config.testdata/extended/three'),
};

describe('Config', function () {
  before(function () {
    o.sinon.stub(loader, 'asArray', function (key) {
      return configs[key];
    });
  });

  after(function () {
    loader.asArray.restore();
  });

  context('when configuration environment is not provided', function () {
    it('should load default configuration', function () {
      const dir = o.path.join(__dirname, 'config.testdata', 'one');
      const loadedConfig = o.config(dir);
      o.assert.deepEqual(loadedConfig, configs.one);
    });
  });

  context('when only configuration environment is provided', function () {
    it('should override default configuration', function () {
      const dir = o.path.join(__dirname, 'config.testdata', 'two');
      o.sinon.stub(config, 'env').returns('dev');
      const loadedConfig = o.config(dir);
      config.env.restore();
      o.assert.deepEqual(loadedConfig, configs.two);
    });
  });

  context('when both configuration environment & local are provided', function () {
    it('should override default configuration', function () {
      const dir = o.path.join(__dirname, 'config.testdata', 'three');
      o.sinon.stub(config, 'env').returns('dev');
      const loadedConfig = o.config(dir);
      config.env.restore();
      o.assert.deepEqual(loadedConfig, configs.three);
    });
  });
});
