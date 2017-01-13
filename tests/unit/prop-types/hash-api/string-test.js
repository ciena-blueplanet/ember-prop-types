/**
 * Unit test for the PropTypes.string validator
 */
import Ember from 'ember'
import {afterEach, beforeEach, describe} from 'mocha'
import sinon from 'sinon'

import {
  itSupportsUpdatableOption,
  itValidatesOnUpdate,
  itValidatesTheProperty,
  spyOnValidateMethods
} from 'dummy/tests/helpers/validator'

import PropTypesMixin, {PropTypes} from 'ember-prop-types/mixins/prop-types'

const requiredDef = {
  required: true,
  type: 'string'
}

const notRequiredDef = {
  required: false,
  type: 'string'
}

describe('Unit / validator / PropTypes.string', function () {
  const ctx = {propertyName: 'bar'}
  let sandbox, Foo

  beforeEach(function () {
    sandbox = sinon.sandbox.create()
    spyOnValidateMethods(sandbox)
  })

  afterEach(function () {
    sandbox.restore()
  })

  describe('when required option not present', function () {
    beforeEach(function () {
      ctx.def = notRequiredDef
      Foo = Ember.Object.extend(PropTypesMixin, {
        propTypes: {
          bar: PropTypes.string()
        }
      })
    })

    describe('when initialized with string value', function () {
      beforeEach(function () {
        ctx.instance = Foo.create({bar: 'baz'})
      })

      itValidatesTheProperty(ctx, false)
      itValidatesOnUpdate(ctx, 'string', 'Expected property bar to be a string')
    })

    describe('when initialized with number value', function () {
      beforeEach(function () {
        ctx.instance = Foo.create({bar: 1})
      })

      itValidatesTheProperty(ctx, false, 'Expected property bar to be a string')
      itValidatesOnUpdate(ctx, 'string', 'Expected property bar to be a string')
    })

    describe('when initialized without value', function () {
      beforeEach(function () {
        ctx.instance = Foo.create()
      })

      itValidatesTheProperty(ctx, false)
      itValidatesOnUpdate(ctx, 'string', 'Expected property bar to be a string')
    })
  })

  describe('when required', function () {
    beforeEach(function () {
      ctx.def = requiredDef
      Foo = Ember.Object.extend(PropTypesMixin, {
        propTypes: {
          bar: PropTypes.string({required: true})
        }
      })
    })

    describe('when initialized with string value', function () {
      beforeEach(function () {
        ctx.instance = Foo.create({bar: 'baz'})
      })

      itValidatesTheProperty(ctx, false)
      itValidatesOnUpdate(ctx, 'string', 'Expected property bar to be a string')
    })

    describe('when initialized with number value', function () {
      beforeEach(function () {
        ctx.instance = Foo.create({bar: 1})
      })

      itValidatesTheProperty(ctx, false, 'Expected property bar to be a string')
      itValidatesOnUpdate(ctx, 'string', 'Expected property bar to be a string')
    })

    describe('when initialized without value', function () {
      beforeEach(function () {
        ctx.instance = Foo.create()
      })

      itValidatesTheProperty(ctx, false, 'Missing required property bar')
      itValidatesOnUpdate(ctx, 'string', 'Expected property bar to be a string')
    })
  })

  describe('when not required', function () {
    beforeEach(function () {
      ctx.def = notRequiredDef
      Foo = Ember.Object.extend(PropTypesMixin, {
        propTypes: {
          bar: PropTypes.string({required: false})
        }
      })
    })

    describe('when initialized with string value', function () {
      beforeEach(function () {
        ctx.instance = Foo.create({bar: 'baz'})
      })

      itValidatesTheProperty(ctx, false)
      itValidatesOnUpdate(ctx, 'string', 'Expected property bar to be a string')
    })

    describe('when initialized with number value', function () {
      beforeEach(function () {
        ctx.instance = Foo.create({bar: 1})
      })

      itValidatesTheProperty(ctx, false, 'Expected property bar to be a string')
      itValidatesOnUpdate(ctx, 'string', 'Expected property bar to be a string')
    })

    describe('when initialized without value', function () {
      beforeEach(function () {
        ctx.instance = Foo.create()
      })

      itValidatesTheProperty(ctx, false)
      itValidatesOnUpdate(ctx, 'string', 'Expected property bar to be a string')
    })
  })

  itSupportsUpdatableOption('string', 'foo', 'bar')
})
