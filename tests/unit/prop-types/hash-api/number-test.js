/**
 * Unit test for the PropTypes.number validator
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
  type: 'number'
}

const notRequiredDef = {
  required: false,
  type: 'number'
}

describe('Unit / validator / PropTypes.number', function () {
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
          bar: PropTypes.number()
        }
      })
    })

    describe('when initialized with number value', function () {
      beforeEach(function () {
        ctx.instance = Foo.create({bar: 1})
      })

      itValidatesTheProperty(ctx, false)
      itValidatesOnUpdate(ctx, 'number', 'Expected property bar to be a number')
    })

    describe('when initialized with string value', function () {
      beforeEach(function () {
        ctx.instance = Foo.create({bar: 'baz'})
      })

      itValidatesTheProperty(ctx, false, 'Expected property bar to be a number')
      itValidatesOnUpdate(ctx, 'number', 'Expected property bar to be a number')
    })

    describe('when initialized without value', function () {
      beforeEach(function () {
        ctx.instance = Foo.create()
      })

      itValidatesTheProperty(ctx, false)
      itValidatesOnUpdate(ctx, 'number', 'Expected property bar to be a number')
    })
  })

  describe('when required', function () {
    beforeEach(function () {
      ctx.def = requiredDef
      Foo = Ember.Object.extend(PropTypesMixin, {
        propTypes: {
          bar: PropTypes.number({required: true})
        }
      })
    })

    describe('when initialized with number value', function () {
      beforeEach(function () {
        ctx.instance = Foo.create({bar: 1})
      })

      itValidatesTheProperty(ctx, false)
      itValidatesOnUpdate(ctx, 'number', 'Expected property bar to be a number')
    })

    describe('when initialized with string value', function () {
      beforeEach(function () {
        ctx.instance = Foo.create({bar: 'baz'})
      })

      itValidatesTheProperty(ctx, false, 'Expected property bar to be a number')
      itValidatesOnUpdate(ctx, 'number', 'Expected property bar to be a number')
    })

    describe('when initialized without value', function () {
      beforeEach(function () {
        ctx.instance = Foo.create()
      })

      itValidatesTheProperty(ctx, false, 'Missing required property bar')
      itValidatesOnUpdate(ctx, 'number', 'Expected property bar to be a number')
    })
  })

  describe('when not required', function () {
    beforeEach(function () {
      ctx.def = notRequiredDef
      Foo = Ember.Object.extend(PropTypesMixin, {
        propTypes: {
          bar: PropTypes.number({required: false})
        }
      })
    })

    describe('when initialized with number value', function () {
      beforeEach(function () {
        ctx.instance = Foo.create({bar: 1})
      })

      itValidatesTheProperty(ctx, false)
      itValidatesOnUpdate(ctx, 'number', 'Expected property bar to be a number')
    })

    describe('when initialized with string value', function () {
      beforeEach(function () {
        ctx.instance = Foo.create({bar: 'baz'})
      })

      itValidatesTheProperty(ctx, false, 'Expected property bar to be a number')
      itValidatesOnUpdate(ctx, 'number', 'Expected property bar to be a number')
    })

    describe('when initialized without value', function () {
      beforeEach(function () {
        ctx.instance = Foo.create()
      })

      itValidatesTheProperty(ctx, false)
      itValidatesOnUpdate(ctx, 'number', 'Expected property bar to be a number')
    })
  })

  itSupportsUpdatableOption('number', 1, 2)
})
