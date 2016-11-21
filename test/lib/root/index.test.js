'use strict';

const o = require('../../common');

describe('Root', function() {
  context('when it is a standalone application', function() {
    /**
     * var/www/cta-app-standalone
     * var/www/cta-app-standalone/node_modules/cta-common
     */
    it('should look for application root in __dirname', function() {
      const root = o.root('cta-app-standalone', 'var/www/cta-app-standalone/node_modules/cta-common/lib/root').replace(/\\/g, '/');
      o.assert.strictEqual(root, 'var/www/cta-app-standalone');
    });
  });
  context('when it is an aggregated application', function() {
    /**
     * var/www/cta-app-aggregated
     * var/www/cta-app-aggregated/node_modules/cta-app-standalone/node_modules/cta-common
     */
    it('should look for application root in __dirname', function() {
      const root = o.root('cta-app-aggregated', 'var/www/cta-app-aggregated/node_modules/cta-app-standalone/node_modules/cta-common/lib/root').replace(/\\/g, '/');
      o.assert.strictEqual(root, 'var/www/cta-app-aggregated');
    });
  });
  context('when all is inside node_modules', function() {
    /**
     * var/www/node_modules/cta-app
     * var/www/node_modules/cta-common
     */
    it('should concatenate node_modules path and application folder', function() {
      const root = o.root('cta-app', 'var/www/node_modules/cta-common/lib/root').replace(/\\/g, '/');
      o.assert.strictEqual(root, 'var/www/node_modules/cta-app');
    });
  });
  context('when it can\'t find application root', function() {
    it('should throw an error', function() {
      try {
        const root = o.root('cta-app', 'var/www/cta-common/lib/root');
        o.assert.fail('should throw an error!');
      } catch (e) {
        o.assert.ok('ok');
      }
    });
  });
});
