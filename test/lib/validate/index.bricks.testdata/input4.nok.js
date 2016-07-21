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
          topic: 't1',
          data: [
            {
              nature: {
                type: 123,
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
        {
          topic: 't2',
          data: [{}],
        },
      ],
    },
  ],
};
