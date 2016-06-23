'use strict';

const assert = require('chai').assert;
const Validate = require('../../lib/validate/');

describe('validate: object input', function() {
  context('keys with string pattern', function() {
    it('non object string patterns', function() {
      const pattern = {
        type: 'object',
        items: {
          a: 'number',
          b: 'boolean',
        },
      };
      let result;
      result = new Validate({a: 123, b: true}, pattern);
      assert.isOk(result.isValid, 'should be ok');
      assert.deepEqual(result.output, {a: 123, b: true});
      result = new Validate({a: 'abc', b: true}, pattern);
      assert.isNotOk(result.isValid, 'should not be ok (1)');
      result = new Validate({a: 123}, pattern);
      assert.isNotOk(result.isValid, 'should not be ok (2)');
    });
    it('string pattern', function() {
      const result = new Validate({a: 1}, 'number');
      assert.isNotOk(result.isValid);
    });
  });

  context('keys with array pattern', function() {
    it('array of string patterns', function() {
      const pattern = {
        type: 'object',
        items: {
          a: ['number', 'string'],
          b: ['string', 'boolean'],
        },
      };
      let result;
      result = new Validate({a: 123, b: 'abc'}, pattern);
      assert.isOk(result.isValid);
      assert.deepEqual(result.output, {a: 123, b: 'abc'});
      result = new Validate({a: true, b: 'abc'}, pattern);
      assert.isNotOk(result.isValid);
    });
  });

  context('keys with object pattern', function() {
    it('simple type', function() {
      const pattern = {
        type: 'object',
        items: {
          a: {
            type: 'number',
          },
          b: {
            type: 'string',
          },
        },
      };
      let result;
      result = new Validate({a: 123, b: 'abc'}, pattern);
      assert.isOk(result.isValid);
      assert.deepEqual(result.output, {a: 123, b: 'abc'});
      result = new Validate({a: 'abc', b: 123}, pattern);
      assert.isNotOk(result.isValid);
    });

    it('simple type with optional', function() {
      const pattern = {
        type: 'object',
        items: {
          a: 'number',
          b: {
            type: 'string',
            optional: true,
            defaultTo: 'abc',
          },
        },
      };
      let result;
      result = new Validate({a: 123}, pattern);
      assert.isOk(result.isValid);
      assert.deepEqual(result.output, {a: 123, b: 'abc'});
      result = new Validate({a: 123, b: 'def'}, pattern);
      assert.isOk(result.isValid);
      assert.deepEqual(result.output, {a: 123, b: 'def'});
      result = new Validate({a: 123, b: 456}, pattern);
      assert.isNotOk(result.isValid);
      result = new Validate({a: 'abc'}, pattern);
      assert.isNotOk(result.isValid);
    });

    it('type array of string patterns', function() {
      const pattern = {
        type: 'object',
        items: {
          a: 'number',
          b: {
            type: 'array',
            items: 'string',
          },
        },
      };
      const input = {
        a: 123,
        b: ['abc', 'def'],
      };
      let result;
      result = new Validate(input, pattern);
      assert.isOk(result.isValid);
      assert.deepEqual(result.output, input);
      input.b[1] = 123;
      result = new Validate(input, pattern);
      assert.isNotOk(result.isValid);
    });

    it('type array of object patterns', function() {
      const pattern = {
        type: 'object',
        items: {
          a: 'number',
          b: {
            type: 'array',
            items: {
              type: 'object',
              items: {
                c: 'number',
                d: 'boolean',
              },
            },
          },
        },
      };
      const input = {
        a: 123,
        b: [{c: 1, d: true}, {c: 2, d: false}],
      };
      let result;
      result = new Validate(input, pattern);
      assert.isOk(result.isValid, 'should be ok');
      assert.deepEqual(result.output, input);
      input.b.push({c: 3, d: 'abc'});
      result = new Validate(input, pattern);
      assert.isNotOk(result.isValid, 'should not be ok');
    });
  });

  it('object with multiple types', function() {
    const pattern = {
      type: 'object',
      items: [{
        type: 'object',
        items: {
          a: 'number',
          b: 'boolean',
        },
      }, {
        type: 'object',
        items: {
          a: 'boolean',
          b: 'string',
        },
      }],
    };
    let result = new Validate({a: 1, b: true}, pattern);
    assert.isOk(result.isValid, 'should be ok (1)');
    assert.deepEqual(result.output, {a: 1, b: true});
    result = new Validate({a: true, b: 'abc'}, pattern);
    assert.isOk(result.isValid, 'should be ok (2)');
    assert.deepEqual(result.output, {a: true, b: 'abc'});
    result = new Validate({a: true, b: false}, pattern);
    assert.isNotOk(result.isValid, 'should not be ok (1)');
    result = new Validate({a: 1, b: 'abc'}, pattern);
    assert.isNotOk(result.isValid, 'should not be ok (2)');
  });

  it('object with 2 depths', function() {
    const pattern = {
      type: 'object',
      items: {
        a: {
          type: 'object',
          items: {
            b: 'string',
            c: 'number',
          },
        },
      },
    };
    const input = {a: {b: 'abc', c: 123}};
    let result = new Validate(input, pattern);
    assert.isOk(result.isValid);
    input.a.c = false;
    result = new Validate(input, pattern);
    assert.isNotOk(result.isValid);
  });

  it('object with 3 depths', function() {
    const pattern = {
      type: 'object',
      items: {
        a: {
          type: 'object',
          items: {
            b: 'string',
            c: {
              type: 'object',
              items: {
                d: 'number',
                e: 'string',
              },
            },
          },
        },
      },
    };
    const input = {
      a: {
        b: 'abc',
        c: {
          d: 12,
          e: 'def',
        },
      },
    };
    let result = new Validate(input, pattern);
    assert.isOk(result.isValid);
    input.a.c.e = true;
    result = new Validate(input, pattern);
    assert.isNotOk(result.isValid);
  });

  it('complex object 1', function() {
    const pattern = {
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
                    data: 'string',
                  },
                },
              },
            },
          },
        },
      },
    };
    const input = {
      bricks: [{
        name: 'one',
        properties: {},
        publish: [{
          topic: 't1',
          data: 'abc',
        }],
      }],
    };
    let result = new Validate(input, pattern);
    assert.isOk(result.isValid, 'should be ok');
    input.bricks[0].publish[0].data = true;
    result = new Validate(input, pattern);
    assert.isNotOk(result.isValid, 'should not be ok');
  });

  it('complex object 2', function() {
    const pattern = {
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
                      items: {
                        type: 'object',
                        items: {
                          nature: 'string',
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
    const input = {
      bricks: [{
        name: 'one',
        properties: {},
        publish: [{
          topic: 't1',
          data: [{
            nature: 'abc',
          }, {
            nature: 'def',
          }],
        }],
      }],
    };
    let result = new Validate(input, pattern);
    assert.isOk(result.isValid, 'should be ok');
    input.bricks[0].publish[0].data[0].nature = true;
    result = new Validate(input, pattern);
    assert.isNotOk(result.isValid, 'should not be ok');
  });

  it('complex object 3', function() {
    const pattern = {
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
                      items: [{
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
                      }],
                    },
                  },
                },
              },
            },
          },
        },
      },
    };
    const input = {
      bricks: [{
        name: 'one',
        properties: {},
        publish: [{
          topic: 't1',
          data: [{
            nature: {
              type: 'type1',
              quality: 'quality1',
            },
          }, {
            nature: {
              type: 'type2',
              quality: 'quality2',
            },
          }],
        }],
      }],
    };
    let result = new Validate(input, pattern);
    assert.isOk(result.isValid, 'should be ok');
    input.bricks[0].publish[0].data[0].nature.type = true;
    result = new Validate(input, pattern);
    assert.isNotOk(result.isValid, 'should not be ok');
  });
});
