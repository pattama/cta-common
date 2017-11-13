/**
 * This source code is provided under the Apache 2.0 license and is provided
 * AS IS with no warranty or guarantee of fit for purpose. See the project's
 * LICENSE.md for details.
 * Copyright 2017 Thomson Reuters. All rights reserved.
 */

'use strict';

const cache = {};

module.exports = function (obj) {
  const type = typeof obj;
  let result;
  if (obj === null) {
    result = 'null';
  } else if (obj === global) {
    result = 'global';
  } else if (type !== 'object') {
    result = type;
  } else {
    const key = ({}).toString.call(obj);
    result = cache[key] || (cache[key] = key.slice(8, -1).toLowerCase());
  }
  return result;
};
