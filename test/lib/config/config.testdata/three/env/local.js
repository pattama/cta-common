'use strict';

module.exports = {
  properties: {
    a: 'http://127.0.0.1',
    b: 8000,
    e: 'e',
  },
  tools: [
    {
      name: 'T1',
      properties: {
        b: {
          c: 'ccc',
        },
      },
    },
  ],
  bricks: [
    {
      name: 'B1',
      properties: {
        b: {
          d: 'dd',
        },
      },
    },
  ],
};
