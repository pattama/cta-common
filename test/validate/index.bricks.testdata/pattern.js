'use strict';

const chanels = {
  type: 'array',
  optional: true,
  defaultTo: [],
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
};

module.exports = {
  type: 'object',
  items: {
    bricks: {
      type: 'array',
      items: {
        type: 'object',
        items: {
          name: {
            type: 'string',
            unique: true,
          },
          properties: 'object',
          publish: chanels,
          subscribe: chanels,
        },
      },
    },
  },
};
