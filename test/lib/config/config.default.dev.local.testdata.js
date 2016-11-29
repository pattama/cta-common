'use strict';

module.exports = {
  name: 'myapp',
  properties: {
    a: 'http://127.0.0.1',
    b: 8000,
    c: true,
    d: 'd',
    e: 'e',
  },
  tools: [
    {
      name: 'T1',
      module: 'cta-t1',
      properties: {
        a: 11,
        b: {
          c: 'ccc',
          d: 'dd',
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
          c: 'cc',
          d: 'dd',
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
