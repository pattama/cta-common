'use strict';

const fs = require('fs');
const ObjectID = require('bson').ObjectID;
const _typeof = require('./typeof');

module.exports = function(input, type) {
  // TODO
  // throw new Error(`unknown type "${type}"`);
  let result = false;
  switch (type) {
  case 'dir':
    if (typeof input === 'string') {
      try {
        const stats = fs.statSync(input);
        if (stats.isDirectory()) {
          result = true;
        }
      } catch (e) {
      }
    }
    break;
  case 'file':
    if (typeof input === 'string') {
      try {
        const stats = fs.statSync(input);
        if (stats.isFile()) {
          result = true;
        }
      } catch (e) {
      }
    }
    break;
  case 'identifier':
    if (typeof input === 'string') {
      result = ObjectID.isValid(input);
    }
    break;
  default:
    result = _typeof(input) === type;
  }
  return result;
};

