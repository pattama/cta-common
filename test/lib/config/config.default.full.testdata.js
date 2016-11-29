'use strict';

module.exports = {
  name: 'myapp',
  properties: {
    a: 'http://localhost:3000',
    b: 3200,
    d: 'd',
  },
  tools: [
    {
      name: 'T1',
      module: 'cta-t1',
      properties: {
        a: 1,
        b: {
          c: 'c',
        },
      },
    },
    {
      name: 'T2',
      module: 'cta-t2',
      properties: {
        d: true,
        e: [1, 2, 3],
      },
    }
  ],
  bricks: [
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
  ],
};
