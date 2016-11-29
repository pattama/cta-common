'use strict';

const o = require('../../common');

describe('root', function() {
  context('when it is a standalone application', function() {
    /**
     * var/www/cta-app-myapp
     * var/www/cta-app-myapp/node_modules/cta-common
     */
    it('should look for application root in __dirname', function() {
      const root = o.root('cta-app-myapp', 'var/www/cta-app-myapp/node_modules/cta-common/lib/root').replace(/\\/g, '/');
      o.assert.strictEqual(root, 'var/www/cta-app-myapp');
    });
  });
  context('when it is inside an aggregated application', function() {
    /**
     * var/www/cta-app-aggregated/node_modules/cta-app-myapp
     * var/www/cta-app-aggregated/node_modules/cta-app-myapp/node_modules/cta-common
     */
    it('should look for application root in __dirname', function() {
      const root = o.root('cta-app-myapp', 'var/www/cta-app-aggregated/node_modules/cta-app-myapp/node_modules/cta-common/lib/root').replace(/\\/g, '/');
      o.assert.strictEqual(root, 'var/www/cta-app-aggregated/node_modules/cta-app-myapp');
    });
  });
  context('when all is inside node_modules', function() {
    /**
     * var/www/node_modules/cta-myapp
     * var/www/node_modules/cta-common
     */
    it('should concatenate node_modules path and application folder', function() {
      const root = o.root('cta-myapp', 'var/www/node_modules/cta-common/lib/root').replace(/\\/g, '/');
      o.assert.strictEqual(root, 'var/www/node_modules/cta-myapp');
    });
  });
  context('when it can\'t find application root', function() {
    it('should throw an error', function() {
      try {
        const root = o.root('cta-myapp', 'var/www/cta-common/lib/root');
        o.assert.fail('should throw an error!');
      } catch (e) {
        o.assert.ok('ok');
      }
    });
  });
});
