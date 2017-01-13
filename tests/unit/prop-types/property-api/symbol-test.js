/**
 * Unit test for the PropTypes.symbol validator
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
  type: 'symbol'
}

const notRequiredDef = {
  isRequired: requiredDef,
  required: false,
  type: 'symbol'
}

describe('Unit / validator / PropTypes.symbol', function () {
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
          bar: PropTypes.symbol.isRequired
        }
      })
    })

    describe('when initialized with symbol value', function () {
      beforeEach(function () {
        ctx.instance = Foo.create({bar: Symbol()})
      })

      itValidatesTheProperty(ctx, false)
      itValidatesOnUpdate(ctx, 'symbol', 'Expected property bar to be a symbol')
    })

    describe('when initialized with string value', function () {
      beforeEach(function () {
        ctx.instance = Foo.create({bar: 'baz'})
      })

      itValidatesTheProperty(ctx, false, 'Expected property bar to be a symbol')
      itValidatesOnUpdate(ctx, 'symbol', 'Expected property bar to be a symbol')
    })

    describe('when initialized without value', function () {
      beforeEach(function () {
        ctx.instance = Foo.create()
      })

      itValidatesTheProperty(ctx, false, 'Missing required property bar')
      itValidatesOnUpdate(ctx, 'symbol', 'Expected property bar to be a symbol')
    })
  })

  describe('when not required', function () {
    beforeEach(function () {
      ctx.def = notRequiredDef
      Foo = Ember.Object.extend(PropTypesMixin, {
        propTypes: {
          bar: PropTypes.symbol
        }
      })
    })

    describe('when initialized with symbol value', function () {
      beforeEach(function () {
        ctx.instance = Foo.create({bar: Symbol()})
      })

      itValidatesTheProperty(ctx, false)
      itValidatesOnUpdate(ctx, 'symbol', 'Expected property bar to be a symbol')
    })

    describe('when initialized with string value', function () {
      beforeEach(function () {
        ctx.instance = Foo.create({bar: 'baz'})
      })

      itValidatesTheProperty(ctx, false, 'Expected property bar to be a symbol')
      itValidatesOnUpdate(ctx, 'symbol', 'Expected property bar to be a symbol')
    })

    describe('when initialized without value', function () {
      beforeEach(function () {
        ctx.instance = Foo.create()
      })

      itValidatesTheProperty(ctx, false)
      itValidatesOnUpdate(ctx, 'symbol', 'Expected property bar to be a symbol')
    })
  })
})
