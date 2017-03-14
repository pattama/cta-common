'use strict';

module.exports = {
  name: 'myapp',
  properties: {
    a: 'http://my.domain.com',
    b: 8080,
    c: true,
    d: 'd',
  },
  tools: [
    {
      name: 'T1',
      module: 'cta-t1',
      properties: {
        a: 11,
        b: {
          c: 'cc',
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
    },
  ],
  bricks: [
    {
      name: 'B1',
      module: 'cta-b1',
      properties: {
        a: 'a',
        b: {
          c: 'cc',
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
