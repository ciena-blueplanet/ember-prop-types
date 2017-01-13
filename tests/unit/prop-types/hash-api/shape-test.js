/**
 * Unit test for the PropTypes.shape validator
 */
import {expect} from 'chai'
import Ember from 'ember'
const {Logger} = Ember
import {afterEach, beforeEach, describe, it} from 'mocha'
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
          bar: PropTypes.shape(
            {
              baz: PropTypes.string.isRequired
            },
            {
              required: true
            }
          )
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
          bar: PropTypes.shape(
            {
              baz: PropTypes.string
            },
            {
              required: true
            }
          )
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
          bar: PropTypes.shape(
            {
              baz: PropTypes.string.isRequired
            },
            {
              required: false
            }
          )
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
          bar: PropTypes.shape(
            {
              baz: PropTypes.string
            },
            {
              required: false
            }
          )
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

  describe('when updatable', function () {
    beforeEach(function () {
      Logger.warn.reset()

      ctx.def = {
        required: false,
        type: 'shape',
        updatable: true
      }

      const Foo = Ember.Object.extend(PropTypesMixin, {
        propTypes: {
          bar: PropTypes.shape({foo: PropTypes.string}, {updatable: true})
        }
      })

      ctx.instance = Foo.create({bar: {foo: 'bar'}})
    })

    describe('when updated', function () {
      beforeEach(function () {
        ctx.instance.set('bar', {foo: 'baz'})
      })

      it('does not log warning', function () {
        expect(Logger.warn.called).to.equal(false)
      })
    })
  })

  describe('when not updatable', function () {
    beforeEach(function () {
      Logger.warn.reset()

      ctx.def = {
        required: false,
        type: 'shape',
        updatable: false
      }

      const Foo = Ember.Object.extend(PropTypesMixin, {
        propTypes: {
          bar: PropTypes.shape({foo: PropTypes.string}, {updatable: false})
        }
      })

      ctx.instance = Foo.create({bar: {foo: 'bar'}})
    })

    describe('when updated', function () {
      beforeEach(function () {
        ctx.instance.set('bar', {foo: 'baz'})
      })

      it('logs warning', function () {
        expect(Logger.warn.called).to.equal(true)
        expect(Logger.warn).to.have.been.calledWith(
          `[${ctx.instance.toString()}]: bar should not be updated`
        )
      })
    })
  })
})
