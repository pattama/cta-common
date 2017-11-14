/**
 * This source code is provided under the Apache 2.0 license and is provided
 * AS IS with no warranty or guarantee of fit for purpose. See the project's
 * LICENSE.md for details.
 * Copyright 2017 Thomson Reuters. All rights reserved.
 */

'use strict';

const path = require('path');

class Root {

  root(app, ctaCommonRootDirName) {
    const dirName = ctaCommonRootDirName || __dirname;
    if (dirName.indexOf(app) >= 0) {
      /*
       - Standalone app:
       * var/www/cta-app-myapp
       * var/www/cta-app-myapp/node_modules/cta-common
       - Or inside an aggregated application:
       * var/www/cta-app-aggregated/node_modules/cta-app-myapp
       * var/www/cta-app-aggregated/node_modules/cta-app-myapp/node_modules/cta-common
       */
      return path.join(dirName.split(app)[0], app);
    } else if (dirName.indexOf('node_modules') >= 0) {
      /*
       - All inside node_modules:
       var/www/cta/node_modules/cta-myapp
       var/www/cta/node_modules/cta-common
       - Or with many node_modules folders
       var/www/cta/node_modules/cta-oss/node_modules/cta-myapp
       var/www/cta/node_modules/cta-oss/node_modules/cta-common
       */
      const nodeModulesDir = dirName.match(/.*node_modules/)[0];
      return path.join(nodeModulesDir, app);
    } else {
      throw new Error(`Can't find root path of application '${app}'`);
    }
  }
}
/**
 * returns application full root path
 * @param {String} app - application folder name, eg. cta-app-boilerplate
 * @param {String} [ctaCommonRootDirName] - optional, to mock __dirname of this script basically for tests!
 */
module.exports = new Root();
