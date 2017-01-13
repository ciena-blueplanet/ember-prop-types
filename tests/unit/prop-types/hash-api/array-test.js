/**
 * Unit test for the PropTypes.array validator
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
  type: 'array'
}

const notRequiredDef = {
  required: false,
  type: 'array'
}

describe('Unit / validator / PropTypes.array', function () {
  const ctx = {propertyName: 'bar'}
  let sandbox, Foo

  beforeEach(function () {
    sandbox = sinon.sandbox.create()
    spyOnValidateMethods(sandbox)
  })

  afterEach(function () {
    sandbox.restore()
  })

  describe('when required property not present', function () {
    beforeEach(function () {
      ctx.def = notRequiredDef
      Foo = Ember.Object.extend(PropTypesMixin, {
        propTypes: {
          bar: PropTypes.array()
        }
      })
    })

    describe('when initialized with object value', function () {
      beforeEach(function () {
        ctx.instance = Foo.create({bar: []})
      })

      itValidatesTheProperty(ctx, false)
      itValidatesOnUpdate(ctx, 'array', 'Expected property bar to be an array')
    })

    describe('when initialized with number value', function () {
      beforeEach(function () {
        ctx.instance = Foo.create({bar: 1})
      })

      itValidatesTheProperty(ctx, false, 'Expected property bar to be an array')
      itValidatesOnUpdate(ctx, 'array', 'Expected property bar to be an array')
    })

    describe('when initialized without value', function () {
      beforeEach(function () {
        ctx.instance = Foo.create()
      })

      itValidatesTheProperty(ctx, false)
      itValidatesOnUpdate(ctx, 'array', 'Expected property bar to be an array')
    })
  })

  describe('when required', function () {
    beforeEach(function () {
      ctx.def = requiredDef
      Foo = Ember.Object.extend(PropTypesMixin, {
        propTypes: {
          bar: PropTypes.array({required: true})
        }
      })
    })

    describe('when initialized with array value', function () {
      beforeEach(function () {
        ctx.instance = Foo.create({bar: []})
      })

      itValidatesTheProperty(ctx, false)
      itValidatesOnUpdate(ctx, 'array', 'Expected property bar to be an array')
    })

    describe('when initialized with number value', function () {
      beforeEach(function () {
        ctx.instance = Foo.create({bar: 1})
      })

      itValidatesTheProperty(ctx, false, 'Expected property bar to be an array')
      itValidatesOnUpdate(ctx, 'array', 'Expected property bar to be an array')
    })

    describe('when initialized without value', function () {
      beforeEach(function () {
        ctx.instance = Foo.create()
      })

      itValidatesTheProperty(ctx, false, 'Missing required property bar')
      itValidatesOnUpdate(ctx, 'array', 'Expected property bar to be an array')
    })
  })

  describe('when not required', function () {
    beforeEach(function () {
      ctx.def = notRequiredDef
      Foo = Ember.Object.extend(PropTypesMixin, {
        propTypes: {
          bar: PropTypes.array({required: false})
        }
      })
    })

    describe('when initialized with object value', function () {
      beforeEach(function () {
        ctx.instance = Foo.create({bar: []})
      })

      itValidatesTheProperty(ctx, false)
      itValidatesOnUpdate(ctx, 'array', 'Expected property bar to be an array')
    })

    describe('when initialized with number value', function () {
      beforeEach(function () {
        ctx.instance = Foo.create({bar: 1})
      })

      itValidatesTheProperty(ctx, false, 'Expected property bar to be an array')
      itValidatesOnUpdate(ctx, 'array', 'Expected property bar to be an array')
    })

    describe('when initialized without value', function () {
      beforeEach(function () {
        ctx.instance = Foo.create()
      })

      itValidatesTheProperty(ctx, false)
      itValidatesOnUpdate(ctx, 'array', 'Expected property bar to be an array')
    })
  })

  itSupportsUpdatableOption('array', [1], [2])
})
