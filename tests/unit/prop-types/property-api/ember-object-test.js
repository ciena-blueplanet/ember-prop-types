/**
 * Unit test for the PropTypes.EmberObject validator
 */
import Ember from 'ember'
import {afterEach, beforeEach, describe} from 'mocha'
import sinon from 'sinon'

import {itValidatesTheProperty, spyOnValidateMethods} from 'dummy/tests/helpers/validator'
import PropTypesMixin, {PropTypes} from 'ember-prop-types/mixins/prop-types'

const requiredDef = {
  required: true,
  type: 'EmberObject'
}

const notRequiredDef = {
  isRequired: requiredDef,
  required: false,
  type: 'EmberObject'
}

describe('Unit / validator / PropTypes.EmberObject', function () {
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
          bar: PropTypes.EmberObject.isRequired
        }
      })
    })

    describe('when initialized with Ember.Object value', function () {
      beforeEach(function () {
        ctx.instance = Foo.create({bar: Ember.Object.create({})})
      })

      itValidatesTheProperty(ctx, false)
    })

    describe('when initialized with POJO value', function () {
      beforeEach(function () {
        ctx.instance = Foo.create({bar: {}})
      })

      itValidatesTheProperty(ctx, false, 'Expected property bar to be an Ember.Object')
    })

    describe('when initialized without value', function () {
      beforeEach(function () {
        ctx.instance = Foo.create()
      })

      itValidatesTheProperty(ctx, false, 'Missing required property bar')
    })
  })

  describe('when not required', function () {
    beforeEach(function () {
      ctx.def = notRequiredDef
      Foo = Ember.Object.extend(PropTypesMixin, {
        propTypes: {
          bar: PropTypes.EmberObject
        }
      })
    })

    describe('when initialized with Ember.Object value', function () {
      beforeEach(function () {
        ctx.instance = Foo.create({bar: Ember.Object.create({})})
      })

      itValidatesTheProperty(ctx, false)
    })

    describe('when initialized with POJO value', function () {
      beforeEach(function () {
        ctx.instance = Foo.create({bar: {}})
      })

      itValidatesTheProperty(ctx, false, 'Expected property bar to be an Ember.Object')
    })

    describe('when initialized without value', function () {
      beforeEach(function () {
        ctx.instance = Foo.create()
      })

      itValidatesTheProperty(ctx, false)
    })
  })
})
