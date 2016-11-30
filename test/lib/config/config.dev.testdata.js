'use strict';

module.exports = {
  properties: {
    a: 'http://my.domain.com',
    b: 8080,
    c: true,
  },
  tools: [
    {
      name: 'T1',
      properties: {
        a: 11,
        b: {
          c: 'cc',
          d: 'dd',
        },
      },
    },
  ],
  bricks: [
    {
      name: 'B1',
      properties: {
        b: {
          c: 'cc',
        },
      },
    },
  ],
};
