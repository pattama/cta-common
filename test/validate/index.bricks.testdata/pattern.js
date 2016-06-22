'use strict';

module.exports = {
  type: 'object',
  items: {
    bricks: {
      type: 'array',
      items: {
        type: 'object',
        items: {
          name: 'string',
          properties: 'object',
          publish: {
            type: 'array',
            items: {
              type: 'object',
              items: {
                topic: 'string',
                data: {
                  type: 'array',
                  optional: true,
                  defaultTo: [{}],
                  items: {
                    type: 'object',
                    items: {
                      nature: {
                        type: 'object',
                        items: {
                          type: 'string',
                          quality: 'string',
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};
