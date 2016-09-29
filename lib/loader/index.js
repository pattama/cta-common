'use strict';

const fs = require('fs');
const path = require('path');
const _ = require('lodash');

class Loader {
  constructor() {

  }

  asArray(_dir, base) {
    const dir = base ? path.join(base, _dir) : _dir;
    try {
      return fs.readdirSync(dir).filter((fileName) => {
        const filePath = dir + path.sep + fileName;
        return (fs.statSync(filePath).isFile() && /\.js$/.test(fileName));
      }).map((fileName) => {
        const filePath = dir + path.sep + fileName;
        return _.cloneDeep(require(filePath));
      }).sort((a, b) => {
        return a.order - b.order;
      });
    } catch (e) {
      throw new Error(`Can't explore directory '${dir}', ${e.message}`);
    }
  }
}

module.exports = new Loader();
