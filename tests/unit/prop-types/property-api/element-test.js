/**
 * Unit test for the PropTypes.element validator
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
  type: 'element'
}

const notRequiredDef = {
  isRequired: requiredDef,
  required: false,
  type: 'element'
}

describe('Unit / validator / PropTypes.element', function () {
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
          bar: PropTypes.element.isRequired
        }
      })
    })

    describe('when initialized with element value', function () {
      beforeEach(function () {
        ctx.instance = Foo.create({bar: document.createElement('div')})
      })

      itValidatesTheProperty(ctx, false)
      itValidatesOnUpdate(ctx, 'element', 'Expected property bar to be an element')
    })

    describe('when initialized with string value', function () {
      beforeEach(function () {
        ctx.instance = Foo.create({bar: 'baz'})
      })

      itValidatesTheProperty(ctx, false, 'Expected property bar to be an element')
      itValidatesOnUpdate(ctx, 'element', 'Expected property bar to be an element')
    })

    describe('when initialized without value', function () {
      beforeEach(function () {
        ctx.instance = Foo.create()
      })

      itValidatesTheProperty(ctx, false, 'Missing required property bar')
      itValidatesOnUpdate(ctx, 'element', 'Expected property bar to be an element')
    })
  })

  describe('when not required', function () {
    beforeEach(function () {
      ctx.def = notRequiredDef
      Foo = Ember.Object.extend(PropTypesMixin, {
        propTypes: {
          bar: PropTypes.element
        }
      })
    })

    describe('when initialized with element value', function () {
      beforeEach(function () {
        ctx.instance = Foo.create({bar: document.createElement('div')})
      })

      itValidatesTheProperty(ctx, false)
      itValidatesOnUpdate(ctx, 'element', 'Expected property bar to be an element')
    })

    describe('when initialized with string value', function () {
      beforeEach(function () {
        ctx.instance = Foo.create({bar: 'baz'})
      })

      itValidatesTheProperty(ctx, false, 'Expected property bar to be an element')
      itValidatesOnUpdate(ctx, 'element', 'Expected property bar to be an element')
    })

    describe('when initialized without value', function () {
      beforeEach(function () {
        ctx.instance = Foo.create()
      })

      itValidatesTheProperty(ctx, false)
      itValidatesOnUpdate(ctx, 'element', 'Expected property bar to be an element')
    })
  })
})
