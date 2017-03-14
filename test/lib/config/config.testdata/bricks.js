'use strict';

module.exports = [
  {
    name: 'B1',
    module: 'cta-b1',
    properties: {
      a: 'a',
      b: {
        c: 'c',
        d: [{
          e: 'e',
          f: false,
        }],
      },
    },
  },
  {
    name: 'B2',
    module: 'cta-b2',
    properties: {
      a: 'a',
      b: [{
        c: 1,
        d: true,
      }],
    },
  },
];
