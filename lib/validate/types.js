'use strict';

const fs = require('fs');

module.exports = {
  string: function(input) {
    return typeof input === 'string';
  },

  number: function(input) {
    return typeof input === 'number';
  },

  array: function(input) {
    return Array.isArray(input);
  },

  object: function(input) {
    return input !== null && !Array.isArray(input) && typeof input === 'object';
  },

  dir: function(input) {
    let result = false;
    if (typeof input === 'string') {
      try {
        const stats = fs.statSync(input);
        if (stats.isDirectory()) {
          result = true;
        }
      } catch (e) {
      }
    }
    return result;
  },

  file: function(input) {
    let result = false;
    if (typeof input === 'string') {
      try {
        const stats = fs.statSync(input);
        if (stats.isFile()) {
          result = true;
        }
      } catch (e) {
      }
    }
    return result;
  },
};