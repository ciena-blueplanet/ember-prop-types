/**
 * Unit test for the PropTypes.object validator
 */
import Ember from 'ember'
import {afterEach, beforeEach, describe} from 'mocha'
import sinon from 'sinon'

import {
  itValidatesOnUpdate,
  itValidatesTheProperty,
  spyOnValidateMethods
} from 'dummy/tests/helpers/validator'

import PropTypesMixin, {PropTypes} from 'ember-prop-types/mixins/prop-types'

const requiredDef = {
  required: true,
  type: 'object'
}

const notRequiredDef = {
  isRequired: requiredDef,
  required: false,
  type: 'object'
}

describe('Unit / validator / PropTypes.object', function () {
  const ctx = {propertyName: 'bar'}
  let sandbox, Foo

  beforeEach(function () {
    sandbox = sinon.sandbox.create()
    spyOnValidateMethods(sandbox)
  })

  afterEach(function () {
    sandbox.restore()
  })

  describe('when required', function () {
    beforeEach(function () {
      ctx.def = requiredDef
      Foo = Ember.Object.extend(PropTypesMixin, {
        propTypes: {
          bar: PropTypes.object.isRequired
        }
      })
    })

    describe('when initialized with object value', function () {
      beforeEach(function () {
        ctx.instance = Foo.create({bar: {}})
      })

      itValidatesTheProperty(ctx, false)
      itValidatesOnUpdate(ctx, 'object', 'Expected property bar to be an object')
    })

    describe('when initialized with number value', function () {
      beforeEach(function () {
        ctx.instance = Foo.create({bar: 1})
      })

      itValidatesTheProperty(ctx, false, 'Expected property bar to be an object')
      itValidatesOnUpdate(ctx, 'object', 'Expected property bar to be an object')
    })

    describe('when initialized without value', function () {
      beforeEach(function () {
        ctx.instance = Foo.create()
      })

      itValidatesTheProperty(ctx, false, 'Missing required property bar')
      itValidatesOnUpdate(ctx, 'object', 'Expected property bar to be an object')
    })
  })

  describe('when not required', function () {
    beforeEach(function () {
      ctx.def = notRequiredDef
      Foo = Ember.Object.extend(PropTypesMixin, {
        propTypes: {
          bar: PropTypes.object
        }
      })
    })

    describe('when initialized with object value', function () {
      beforeEach(function () {
        ctx.instance = Foo.create({bar: {}})
      })

      itValidatesTheProperty(ctx, false)
      itValidatesOnUpdate(ctx, 'object', 'Expected property bar to be an object')
    })

    describe('when initialized with number value', function () {
      beforeEach(function () {
        ctx.instance = Foo.create({bar: 1})
      })

      itValidatesTheProperty(ctx, false, 'Expected property bar to be an object')
      itValidatesOnUpdate(ctx, 'object', 'Expected property bar to be an object')
    })

    describe('when initialized without value', function () {
      beforeEach(function () {
        ctx.instance = Foo.create()
      })

      itValidatesTheProperty(ctx, false)
      itValidatesOnUpdate(ctx, 'object', 'Expected property bar to be an object')
    })
  })
})
