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
    },
  ],
};
