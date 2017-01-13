/**
 * Unit test for the PropTypes.oneOf validator
 */
import Ember from 'ember'
import {afterEach, beforeEach, describe} from 'mocha'
import sinon from 'sinon'

import {itValidatesTheProperty, spyOnValidateMethods} from 'dummy/tests/helpers/validator'
import PropTypesMixin, {PropTypes} from 'ember-prop-types/mixins/prop-types'

const requiredDef = {
  required: true,
  type: 'oneOf',
  valueOptions: ['alpha', 'bravo']
}

const notRequiredDef = {
  isRequired: requiredDef,
  required: false,
  type: 'oneOf',
  valueOptions: ['alpha', 'bravo']
}

describe('Unit / validator / PropTypes.oneOf', function () {
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
          bar: PropTypes.oneOf([
            'alpha',
            'bravo'
          ]).isRequired
        }
      })
    })

    describe('when initialized with valid value', function () {
      beforeEach(function () {
        ctx.instance = Foo.create({bar: 'alpha'})
      })

      itValidatesTheProperty(ctx, false)
    })

    describe('when initialized with another valid value', function () {
      beforeEach(function () {
        ctx.instance = Foo.create({bar: 'bravo'})
      })

      itValidatesTheProperty(ctx, false)
    })

    describe('when initialized with invalid value', function () {
      beforeEach(function () {
        ctx.instance = Foo.create({bar: 'charlie'})
      })

      itValidatesTheProperty(ctx, false, 'Property bar is not one of: alpha, bravo')
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
          bar: PropTypes.oneOf([
            'alpha',
            'bravo'
          ])
        }
      })
    })

    describe('when initialized with valid value', function () {
      beforeEach(function () {
        ctx.instance = Foo.create({bar: 'alpha'})
      })

      itValidatesTheProperty(ctx, false)
    })

    describe('when initialized with another valid value', function () {
      beforeEach(function () {
        ctx.instance = Foo.create({bar: 'bravo'})
      })

      itValidatesTheProperty(ctx, false)
    })

    describe('when initialized with invalid value', function () {
      beforeEach(function () {
        ctx.instance = Foo.create({bar: 'charlie'})
      })

      itValidatesTheProperty(ctx, false, 'Property bar is not one of: alpha, bravo')
    })

    describe('when initialized without value', function () {
      beforeEach(function () {
        ctx.instance = Foo.create()
      })

      itValidatesTheProperty(ctx, false)
    })
  })
})
