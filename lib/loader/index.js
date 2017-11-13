/**
 * This source code is provided under the Apache 2.0 license and is provided
 * AS IS with no warranty or guarantee of fit for purpose. See the project's
 * LICENSE.md for details.
 * Copyright 2017 Thomson Reuters. All rights reserved.
 */

'use strict';

const fs = require('fs');
const path = require('path');

class Loader {

  asArray(_dir, base) {
    const dir = base ? path.join(base, _dir) : _dir;
    try {
      return fs.readdirSync(dir).filter((fileName) => {
        const filePath = dir + path.sep + fileName;
        return (fs.statSync(filePath).isFile() && /\.js$/.test(fileName));
      }).map((fileName) => {
        const filePath = dir + path.sep + fileName;
        return require(filePath);
      }).sort((a, b) => {
        return a.order - b.order;
      });
    } catch (e) {
      throw new Error(`Can't explore directory '${dir}', ${e.message}`);
    }
  }

  asObject(_dir, base) {
    const dir = base ? path.join(base, _dir) : _dir;
    const obj = {};
    try {
      fs.readdirSync(dir).forEach((fileName) => {
        const filePath = dir + path.sep + fileName;
        if (fs.statSync(filePath).isFile() && /\.js$/.test(fileName)) {
          const key = fileName.split('.')[0];
          obj[key] = require(filePath);
        }
      });
      return obj;
    } catch (e) {
      throw new Error(`Can't explore directory '${dir}', ${e.message}`);
    }
  }
}

module.exports = new Loader();
