'use strict';

module.exports = {
  logger: {
    type: 'object',
    optional: true,
    defaultTo: {},
  },
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
};
