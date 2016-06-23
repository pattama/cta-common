'use strict';

module.exports = {
  bricks: [
    {
      name: 'one',
      properties: {
        a: 1,
        b: 2,
      },
      publish: [
        {
          topic: 123,
          data: [
            {
              nature: {
                type: 'type1',
                quality: 'quality1',
              },
            },
            {
              nature: {
                type: 'type2',
                quality: 'quality2',
              },
            },
          ],
        },
      ],
      subscribe: [
        {
          topic: 't4',
          data: [
            {
              nature: {
                type: 'type7',
                quality: 'quality7',
              },
            },
            {
              nature: {
                type: 'type8',
                quality: 'quality8',
              },
            },
          ],
        },
      ],
    },
  ],
};
