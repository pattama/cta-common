'use strict';

const cache = {};

module.exports = function(obj) {
  const type = typeof obj;
  let result;
  if (obj === null) {
    result = 'null';
  } else if (obj === global) {
    result = 'global';
  } else if (type !== 'object') {
    result = type;
  } else {
    let key;
    result = cache[key = ({}).toString.call(obj)] || (cache[key] = key.slice(8, -1).toLowerCase());
  }
  return result;
};
