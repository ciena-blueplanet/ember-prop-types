/**
 * Unit test for the PropTypes.shape validator
 */
import Ember from 'ember'
import {afterEach, beforeEach, describe} from 'mocha'
import sinon from 'sinon'

import {itValidatesTheProperty, spyOnValidateMethods} from 'dummy/tests/helpers/validator'
import PropTypesMixin, {PropTypes} from 'ember-prop-types/mixins/prop-types'

describe('Unit / validator / PropTypes.shape', function () {
  const ctx = {propertyName: 'bar'}
  let sandbox, Foo

  beforeEach(function () {
    sandbox = sinon.sandbox.create()
    spyOnValidateMethods(sandbox)
  })

  afterEach(function () {
    sandbox.restore()
  })

  describe('when required and sub-property required', function () {
    beforeEach(function () {
      ctx.def = {
        required: true,
        type: 'shape',
        typeDefs: {
          baz: {
            required: true,
            type: 'string'
          }
        }
      }

      Foo = Ember.Object.extend(PropTypesMixin, {
        propTypes: {
          bar: PropTypes.shape({
            baz: PropTypes.string.isRequired
          }).isRequired
        }
      })
    })

    describe('when initialized with correct shape value', function () {
      beforeEach(function () {
        ctx.instance = Foo.create({
          bar: {
            baz: 'test'
          }
        })
      })

      itValidatesTheProperty(ctx, false)
    })

    describe('when initialized with shape missing sub-property', function () {
      beforeEach(function () {
        ctx.instance = Foo.create({
          bar: {}
        })
      })

      itValidatesTheProperty(
        ctx,
        false,
        'Property bar is missing required property baz',
        'Property bar does not match the given shape'
      )
    })

    describe('when initialized with incorrect shape value', function () {
      beforeEach(function () {
        ctx.instance = Foo.create({
          bar: {
            baz: 1
          }
        })
      })

      itValidatesTheProperty(
        ctx,
        false,
        'Expected property bar.baz to be a string',
        'Property bar does not match the given shape'
      )
    })

    describe('when initialized with an extra property in shape', function () {
      beforeEach(function () {
        ctx.instance = Foo.create({
          bar: {
            baz: 'test',
            spam: 'is yummy'
          }
        })
      })

      itValidatesTheProperty(
        ctx,
        false,
        'Property bar has an unknown key: spam',
        'Property bar does not match the given shape'
      )
    })

    describe('when initialized with number value', function () {
      beforeEach(function () {
        ctx.instance = Foo.create({bar: 1})
      })

      itValidatesTheProperty(ctx, false, 'Property bar does not match the given shape')
    })

    describe('when initialized without value', function () {
      beforeEach(function () {
        ctx.instance = Foo.create()
      })

      itValidatesTheProperty(ctx, false, 'Missing required property bar')
    })
  })

  describe('when required and sub-property not required', function () {
    beforeEach(function () {
      ctx.def = {
        required: true,
        type: 'shape',
        typeDefs: {
          baz: {
            isRequired: {
              required: true,
              type: 'string'
            },
            required: false,
            type: 'string'
          }
        }
      }

      Foo = Ember.Object.extend(PropTypesMixin, {
        propTypes: {
          bar: PropTypes.shape({
            baz: PropTypes.string
          }).isRequired
        }
      })
    })

    describe('when initialized with correct shape value', function () {
      beforeEach(function () {
        ctx.instance = Foo.create({
          bar: {
            baz: 'test'
          }
        })
      })

      itValidatesTheProperty(ctx, false)
    })

    describe('when initialized with shape missing sub-property', function () {
      beforeEach(function () {
        ctx.instance = Foo.create({
          bar: {}
        })
      })

      itValidatesTheProperty(ctx, false)
    })

    describe('when initialized with incorrect shape value', function () {
      beforeEach(function () {
        ctx.instance = Foo.create({
          bar: {
            baz: 1
          }
        })
      })

      itValidatesTheProperty(
        ctx,
        false,
        'Expected property bar.baz to be a string',
        'Property bar does not match the given shape'
      )
    })

    describe('when initialized with an extra property in the shape', function () {
      beforeEach(function () {
        ctx.instance = Foo.create({
          bar: {
            spam: 'test'
          }
        })
      })

      itValidatesTheProperty(
        ctx,
        false,
        'Property bar has an unknown key: spam',
        'Property bar does not match the given shape'
      )
    })

    describe('when initialized with number value', function () {
      beforeEach(function () {
        ctx.instance = Foo.create({bar: 1})
      })

      itValidatesTheProperty(ctx, false, 'Property bar does not match the given shape')
    })

    describe('when initialized without value', function () {
      beforeEach(function () {
        ctx.instance = Foo.create()
      })

      itValidatesTheProperty(ctx, false, 'Missing required property bar')
    })
  })

  describe('when not required and sub-property is required', function () {
    beforeEach(function () {
      ctx.def = {
        isRequired: {
          required: true,
          type: 'shape',
          typeDefs: {
            baz: {
              required: true,
              type: 'string'
            }
          }
        },
        required: false,
        type: 'shape',
        typeDefs: {
          baz: {
            required: true,
            type: 'string'
          }
        }
      }

      Foo = Ember.Object.extend(PropTypesMixin, {
        propTypes: {
          bar: PropTypes.shape({
            baz: PropTypes.string.isRequired
          })
        }
      })
    })

    describe('when initialized with correct shape value', function () {
      beforeEach(function () {
        ctx.instance = Foo.create({
          bar: {
            baz: 'test'
          }
        })
      })

      itValidatesTheProperty(ctx, false)
    })

    describe('when initialized with shape missing sub-property', function () {
      beforeEach(function () {
        ctx.instance = Foo.create({
          bar: {}
        })
      })

      itValidatesTheProperty(
        ctx,
        false,
        'Property bar is missing required property baz',
        'Property bar does not match the given shape'
      )
    })

    describe('when initialized with incorrect shape value', function () {
      beforeEach(function () {
        ctx.instance = Foo.create({
          bar: {
            baz: 1
          }
        })
      })

      itValidatesTheProperty(
        ctx,
        false,
        'Expected property bar.baz to be a string',
        'Property bar does not match the given shape'
      )
    })

    describe('when initialized with an extra property in the shape', function () {
      beforeEach(function () {
        ctx.instance = Foo.create({
          bar: {
            baz: 'test',
            spam: 'is yummy'
          }
        })
      })

      itValidatesTheProperty(
        ctx,
        false,
        'Property bar has an unknown key: spam',
        'Property bar does not match the given shape'
      )
    })

    describe('when initialized with number value', function () {
      beforeEach(function () {
        ctx.instance = Foo.create({bar: 1})
      })

      itValidatesTheProperty(ctx, false, 'Property bar does not match the given shape')
    })

    describe('when initialized without value', function () {
      beforeEach(function () {
        ctx.instance = Foo.create()
      })

      itValidatesTheProperty(ctx, false)
    })
  })

  describe('when not required and sub-property is not required', function () {
    beforeEach(function () {
      ctx.def = {
        isRequired: {
          required: true,
          type: 'shape',
          typeDefs: {
            baz: {
              isRequired: {
                required: true,
                type: 'string'
              },
              required: false,
              type: 'string'
            }
          }
        },
        required: false,
        type: 'shape',
        typeDefs: {
          baz: {
            isRequired: {
              required: true,
              type: 'string'
            },
            required: false,
            type: 'string'
          }
        }
      }

      Foo = Ember.Object.extend(PropTypesMixin, {
        propTypes: {
          bar: PropTypes.shape({
            baz: PropTypes.string
          })
        }
      })
    })

    describe('when initialized with correct shape value', function () {
      beforeEach(function () {
        ctx.instance = Foo.create({
          bar: {
            baz: 'test'
          }
        })
      })

      itValidatesTheProperty(ctx, false)
    })

    describe('when initialized with shape missing sub-property', function () {
      beforeEach(function () {
        ctx.instance = Foo.create({
          bar: {}
        })
      })

      itValidatesTheProperty(ctx, false)
    })

    describe('when initialized with incorrect shape value', function () {
      beforeEach(function () {
        ctx.instance = Foo.create({
          bar: {
            baz: 1
          }
        })
      })

      itValidatesTheProperty(
        ctx,
        false,
        'Expected property bar.baz to be a string',
        'Property bar does not match the given shape'
      )
    })

    describe('when initialized with an extra property in the shape', function () {
      beforeEach(function () {
        ctx.instance = Foo.create({
          bar: {
            baz: 'test',
            spam: 'is yummy'
          }
        })
      })

      itValidatesTheProperty(
        ctx,
        false,
        'Property bar has an unknown key: spam',
        'Property bar does not match the given shape'
      )
    })

    describe('when initialized with number value', function () {
      beforeEach(function () {
        ctx.instance = Foo.create({bar: 1})
      })

      itValidatesTheProperty(ctx, false, 'Property bar does not match the given shape')
    })

    describe('when initialized without value', function () {
      beforeEach(function () {
        ctx.instance = Foo.create()
      })

      itValidatesTheProperty(ctx, false)
    })
  })
})
