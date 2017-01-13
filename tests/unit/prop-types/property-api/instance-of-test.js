/**
 * Unit test for the PropTypes.instanceOf validator
 */
import Ember from 'ember'
import {afterEach, beforeEach, describe} from 'mocha'
import sinon from 'sinon'

import {itValidatesTheProperty, spyOnValidateMethods} from 'dummy/tests/helpers/validator'
import PropTypesMixin, {PropTypes} from 'ember-prop-types/mixins/prop-types'

class Classy {}

const requiredDef = {
  required: true,
  type: 'instanceOf',
  typeDef: Classy
}

const notRequiredDef = {
  isRequired: requiredDef,
  required: false,
  type: 'instanceOf',
  typeDef: Classy
}

describe('Unit / validator / PropTypes.instanceOf', function () {
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
          bar: PropTypes.instanceOf(Classy).isRequired
        }
      })
    })

    describe('when initialized with Classy instance', function () {
      beforeEach(function () {
        ctx.instance = Foo.create({bar: new Classy()})
      })

      itValidatesTheProperty(ctx, false)
    })

    describe('when initialized with non-Classy instance', function () {
      beforeEach(function () {
        ctx.instance = Foo.create({bar: 1})
      })

      itValidatesTheProperty(ctx, false, 'Expected property bar to be an instance of Classy')
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
          bar: PropTypes.instanceOf(Classy)
        }
      })
    })

    describe('when initialized with Classy instance', function () {
      beforeEach(function () {
        ctx.instance = Foo.create({bar: new Classy()})
      })

      itValidatesTheProperty(ctx, false)
    })

    describe('when initialized with non-Classy instance', function () {
      beforeEach(function () {
        ctx.instance = Foo.create({bar: 1})
      })

      itValidatesTheProperty(ctx, false, 'Expected property bar to be an instance of Classy')
    })

    describe('when initialized without value', function () {
      beforeEach(function () {
        ctx.instance = Foo.create()
      })

      itValidatesTheProperty(ctx, false)
    })
  })
})
