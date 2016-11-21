'use strict';

const path = require('path');
/**
 * returns application full root path
 * @param {String} app - application folder name, eg. cta-app-boilerplate
 * @param {String} ctaCommonRootDirName - optional, to mock __dirname of this script
 */
module.exports = function(app, ctaCommonRootDirName) {
  const dirName = ctaCommonRootDirName || __dirname;
  if (dirName.indexOf(app) >= 0) {
    /*
     - Standalone app:
     var/www/cta-app-standalone
     var/www/cta-app-standalone/node_modules/cta-common
     - Or aggregated application:
     var/www/cta-app-aggregated
     var/www/cta-app-aggregated/node_modules/cta-app-standalone/node_modules/cta-common
     */
    return path.join(dirName.split(app)[0], app);
  } else if (dirName.indexOf('node_modules') >= 0) {
    /*
     - All inside node_modules:
     var/www/cta/node_modules/cta-app
     var/www/cta/node_modules/cta-common
     - Or with many node_modules
     var/www/cta/node_modules/cta-oss/node_modules/cta-app
     var/www/cta/node_modules/cta-oss/node_modules/cta-common
     */
    const nodeModulesDir = dirName.match(/.*node_modules/)[0];
    return path.join(nodeModulesDir, app);
  } else {
    throw new Error(`Can't find root path of application '${app}'`);
  }
};
