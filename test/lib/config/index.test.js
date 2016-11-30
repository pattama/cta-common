'use strict';

const config = require('../../../lib/config');
const root = require('../../../lib/root');
const loader = require('../../../lib/loader');
const o = require('../../common');
const configDefault = require('./config.default.testdata');
const configDefaultFull = require('./config.default.full.testdata');
const configDefaultDev = require('./config.default.dev.testdata');
const configDefaultDevLocal = require('./config.default.dev.local.testdata');

describe('Config', function () {
  before(function () {
    o.sinon.stub(root, 'root', function () {
      return 'root';
    });
    o.assert.strictEqual(o.root('myapp'), 'root');
    o.sinon.stub(loader, 'asArray', function (key) {
      return configDefault[key];
    });
  });

  after(function () {
    root.root.restore();
    loader.asArray.restore();
    o.path.join.restore();
  });

  context('when configuration environment is not provided', function () {
    it('should load default configuration', function () {
      const confPropPath = o.path.join(__dirname, 'config.default.properties.testdata.js');
      o.sinon.stub(o.path, 'join')
        .withArgs('root', 'lib', 'apps', 'main', 'config')
          .returns('configDir')
        .withArgs('configDir', 'properties')
          .returns(confPropPath)
        .withArgs('configDir', 'env', 'local.js')
          .returns('');
      o.assert.strictEqual(o.path.join('root', 'lib', 'apps', 'main', 'config'), 'configDir');
      o.assert.strictEqual(o.path.join('configDir', 'properties'), confPropPath);
      o.assert.strictEqual(o.path.join('configDir', 'env', 'local.js'), '');
      o.sinon.stub(config, 'env').returns('');
      const finalConfig = o.config('myapp');
      config.env.restore();
      o.assert.deepEqual(finalConfig, configDefaultFull);
    });
  });

  context('when only configuration environment is provided', function () {
    it('should override default configuration', function () {
      o.path.join.restore();
      const confPropPath = o.path.join(__dirname, 'config.default.properties.testdata.js');
      const confDevPath = o.path.join(__dirname, 'config.dev.testdata');
      o.sinon.stub(o.path, 'join')
        .withArgs('root', 'lib', 'apps', 'main', 'config')
          .returns('configDir')
        .withArgs('configDir', 'env', 'dev.js')
          .returns(confDevPath)
        .withArgs('configDir', 'properties')
          .returns(confPropPath)
        .withArgs('configDir', 'env', 'local.js')
          .returns('');
      o.assert.strictEqual(o.path.join('root', 'lib', 'apps', 'main', 'config'), 'configDir');
      o.assert.strictEqual(o.path.join('configDir', 'env', 'dev.js'), confDevPath);
      o.assert.strictEqual(o.path.join('configDir', 'properties'), confPropPath);
      o.assert.strictEqual(o.path.join('configDir', 'env', 'local.js'), '');
      o.sinon.stub(config, 'env').returns('dev');
      const finalConfig = o.config('myapp');
      config.env.restore();
      o.assert.deepEqual(finalConfig, configDefaultDev);
    });
  });

  context('when both configuration environment & local are provided', function () {
    it('should override default configuration', function () {
      o.path.join.restore();
      const confPropPath = o.path.join(__dirname, 'config.default.properties.testdata.js');
      const confDevPath = o.path.join(__dirname, 'config.dev.testdata');
      const confLocalPath = o.path.join(__dirname, 'config.local.testdata');
      o.sinon.stub(o.path, 'join')
        .withArgs('root', 'lib', 'apps', 'main', 'config')
          .returns('configDir')
        .withArgs('configDir', 'env', 'dev.js')
          .returns(confDevPath)
        .withArgs('configDir', 'properties')
          .returns(confPropPath)
        .withArgs('configDir', 'env', 'local.js')
          .returns(confLocalPath);
      o.assert.strictEqual(o.path.join('root', 'lib', 'apps', 'main', 'config'), 'configDir');
      o.assert.strictEqual(o.path.join('configDir', 'env', 'dev.js'), confDevPath);
      o.assert.strictEqual(o.path.join('configDir', 'properties'), confPropPath);
      o.assert.strictEqual(o.path.join('configDir', 'env', 'local.js'), confLocalPath);
      o.sinon.stub(config, 'env').returns('dev');
      const finalConfig = o.config('myapp');
      config.env.restore();
      o.assert.deepEqual(finalConfig, configDefaultDevLocal);
    });
  });
});
