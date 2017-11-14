/**
 * This source code is provided under the Apache 2.0 license and is provided
 * AS IS with no warranty or guarantee of fit for purpose. See the project's
 * LICENSE.md for details.
 * Copyright 2017 Thomson Reuters. All rights reserved.
 */

'use strict';

const fs = require('fs');
const ObjectID = require('bson').ObjectID;
const _typeof = require('./typeof');

module.exports = function (input, type) {
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
          // console.log(e.message)
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
          // console.log(e.message)
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
