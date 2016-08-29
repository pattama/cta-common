'use strict';

const o = require('../../common');

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
      result = o.validate({a: 123, b: true}, pattern);
      o.assert.isOk(result.isValid, 'should be ok');
      o.assert.deepEqual(result.output, {a: 123, b: true});
      result = o.validate({a: 'abc', b: true}, pattern);
      o.assert.isNotOk(result.isValid, 'should not be ok (1)');
      result = o.validate({a: 123}, pattern);
      o.assert.isNotOk(result.isValid, 'should not be ok (2)');
    });
    it('string pattern', function() {
      const result = o.validate({a: 1}, 'number');
      o.assert.isNotOk(result.isValid);
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
      result = o.validate({a: 123, b: 'abc'}, pattern);
      o.assert.isOk(result.isValid);
      o.assert.deepEqual(result.output, {a: 123, b: 'abc'});
      result = o.validate({a: true, b: 'abc'}, pattern);
      o.assert.isNotOk(result.isValid);
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
      result = o.validate({a: 123, b: 'abc'}, pattern);
      o.assert.isOk(result.isValid);
      o.assert.deepEqual(result.output, {a: 123, b: 'abc'});
      result = o.validate({a: 'abc', b: 123}, pattern);
      o.assert.isNotOk(result.isValid);
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
      result = o.validate({a: 123}, pattern);
      o.assert.isOk(result.isValid);
      o.assert.deepEqual(result.output, {a: 123, b: 'abc'});
      result = o.validate({a: 123, b: 'def'}, pattern);
      o.assert.isOk(result.isValid);
      o.assert.deepEqual(result.output, {a: 123, b: 'def'});
      result = o.validate({a: 123, b: 456}, pattern);
      o.assert.isNotOk(result.isValid);
      result = o.validate({a: 'abc'}, pattern);
      o.assert.isNotOk(result.isValid);
    });

    context('simple type with custom validator', function() {
      context('when custom validator is incorrect (not a function)', function() {
        it('should throw error', function() {
          const input = {a: 123};
          const pattern = {
            type: 'object',
            items: {
              a: {
                type: 'custom',
                validator: {},
              },
            },
          };
          o.assert.throws(function() {
            return o.validate(input, pattern);
          }, `custom validator is not a function for value ${input.a}`);
        });
      });

      context('when custom validator returns a non object response', function() {
        it('should throw error', function() {
          const input = {a: 123};
          const pattern = {
            type: 'object',
            items: {
              a: {
                type: 'custom',
                validator: o.sinon.stub().returns('not-an-object'),
              },
            },
          };
          o.assert.throws(function() {
            return o.validate(input, pattern);
          }, `incorrect object response from custom validator for value ${input.a}`);
        });
      });

      context('when custom validator returns a non boolean response.isValid', function() {
        it('should throw error', function() {
          const input = {a: 123};
          const pattern = {
            type: 'object',
            items: {
              a: {
                type: 'custom',
                validator: o.sinon.stub().returns({ isValid: 'not-a-boolean' }),
              },
            },
          };
          o.assert.throws(function() {
            return o.validate(input, pattern);
          }, `incorrect boolean response.isValid from custom validator for value ${input.a}`);
        });
      });

      context('when custom validator returns a non Error response.error', function() {
        it('should throw error', function() {
          const input = {a: 123};
          const pattern = {
            type: 'object',
            items: {
              a: {
                type: 'custom',
                validator: o.sinon.stub().returns({ isValid: false, error: {} }),
              },
            },
          };
          o.assert.throws(function() {
            return o.validate(input, pattern);
          }, `incorrect Error response.error from custom validator for value ${input.a}`);
        });
      });

      context('when custom validator returns true', function() {
        it('should return true', function() {
          const input = {a: 123};
          const pattern = {
            type: 'object',
            items: {
              a: {
                type: 'custom',
                validator: o.sinon.stub().returns({
                  isValid: true,
                }),
              },
            },
          };
          const result = o.validate(input, pattern);
          o.assert.isOk(result.isValid);
        });
      });

      context('when custom validator returns false', function() {
        it('should return false', function() {
          const input = {a: 123};
          const error = new Error('mock error');
          const pattern = {
            type: 'object',
            items: {
              a: {
                type: 'custom',
                validator: o.sinon.stub().returns({
                  isValid: false,
                  error: error,
                }),
              },
            },
          };
          const result = o.validate(input, pattern);
          o.assert.isNotOk(result.isValid);
          o.assert.equal(result.results.a.error,
            `invalid type for value "${input.a}", custom validator returned error: ${error.message}`);
        });
      });
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
      result = o.validate(input, pattern);
      o.assert.isOk(result.isValid);
      o.assert.deepEqual(result.output, input);
      input.b[1] = 123;
      result = o.validate(input, pattern);
      o.assert.isNotOk(result.isValid);
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
      result = o.validate(input, pattern);
      o.assert.isOk(result.isValid, 'should be ok');
      o.assert.deepEqual(result.output, input);
      input.b.push({c: 3, d: 'abc'});
      result = o.validate(input, pattern);
      o.assert.isNotOk(result.isValid, 'should not be ok');
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
    let result = o.validate({a: 1, b: true}, pattern);
    o.assert.isOk(result.isValid, 'should be ok (1)');
    o.assert.deepEqual(result.output, {a: 1, b: true});
    result = o.validate({a: true, b: 'abc'}, pattern);
    o.assert.isOk(result.isValid, 'should be ok (2)');
    o.assert.deepEqual(result.output, {a: true, b: 'abc'});
    result = o.validate({a: true, b: false}, pattern);
    o.assert.isNotOk(result.isValid, 'should not be ok (1)');
    result = o.validate({a: 1, b: 'abc'}, pattern);
    o.assert.isNotOk(result.isValid, 'should not be ok (2)');
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
    let result = o.validate(input, pattern);
    o.assert.isOk(result.isValid);
    input.a.c = false;
    result = o.validate(input, pattern);
    o.assert.isNotOk(result.isValid);
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
    let result = o.validate(input, pattern);
    o.assert.isOk(result.isValid);
    input.a.c.e = true;
    result = o.validate(input, pattern);
    o.assert.isNotOk(result.isValid);
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
    let result = o.validate(input, pattern);
    o.assert.isOk(result.isValid, 'should be ok');
    input.bricks[0].publish[0].data = true;
    result = o.validate(input, pattern);
    o.assert.isNotOk(result.isValid, 'should not be ok');
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
    let result = o.validate(input, pattern);
    o.assert.isOk(result.isValid, 'should be ok');
    input.bricks[0].publish[0].data[0].nature = true;
    result = o.validate(input, pattern);
    o.assert.isNotOk(result.isValid, 'should not be ok');
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
    let result = o.validate(input, pattern);
    o.assert.isOk(result.isValid, 'should be ok');
    input.bricks[0].publish[0].data[0].nature.type = true;
    result = o.validate(input, pattern);
    o.assert.isNotOk(result.isValid, 'should not be ok');
  });
});
