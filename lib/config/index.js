'use strict';

const path = require('path');
const root = require('../root');
const load = require('../loader');
const _ = require('lodash');
const extend = require('extend');
const minimist = require('minimist');

class Config {

  /**
   * returns application configuration
   * @param {String} name - application folder name
   */
  config(name) {
    const appRoot = root.root(name);
    const configDir = path.join(appRoot, 'lib', 'apps', 'main', 'config');
    const propertiesPath = path.join(configDir, 'properties');
    let properties;
    try {
      properties = require(propertiesPath);
    } catch (e) {
      properties = {};
    }
    const defaultConfig = {
      name,
      tools: load.asArray('tools', configDir),
      bricks: load.asArray('bricks', configDir),
      properties,
    };

    const env = this.env();
    if (env) {
      // attempt to load environment configuration
      const envConfigFileName = path.join(configDir, 'env', `${env}.js`);
      let envConfig;
      try {
        envConfig = require(envConfigFileName);
      } catch (e) {
        // throw new Error(`Can't load configuration environment in '${envConfigFileName}'`);
      }
      this.extend(defaultConfig, envConfig);
    }

    // attempt to load local configuration
    const localConfigFileName = path.join(configDir, 'env', 'local.js');
    let localConfig;
    try {
      localConfig = require(localConfigFileName);
    } catch (e) {
      localConfig = null;
    }
    if (localConfig) {
      this.extend(defaultConfig, localConfig);
    }
    return defaultConfig;
  }

  env() {
    const argv = minimist(process.argv.slice(2));
    return argv.env || process.env.NODE_ENV;
  }

  /**
   * extends destination with source
   * @param {Object} destination
   * @param {Object} source
   * @private
   */
  extend(destination, source) {
    if (!source) {
      return;
    }
    if (source.properties) {
      extend(true, destination.properties, source.properties);
    }
    if (Array.isArray(source.tools)) {
      source.tools.forEach((sourceTool) => {
        const destinationTool = _.find(destination.tools, (tool) => {
          return tool.name === sourceTool.name;
        });
        if (destinationTool) {
          extend(true, destinationTool, sourceTool);
        }
      });
    }
    if (Array.isArray(source.bricks)) {
      source.bricks.forEach((sourceBrick) => {
        const destinationBrick = _.find(destination.bricks, (brick) => {
          return brick.name === sourceBrick.name;
        });
        if (destinationBrick) {
          extend(true, destinationBrick, sourceBrick);
        }
      });
    }
  }
}

module.exports = new Config();
