/**
 * Unit test for the PropTypes.func validator
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
  type: 'func'
}

const notRequiredDef = {
  required: false,
  type: 'func'
}

describe('Unit / validator / PropTypes.func', function () {
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
          bar: PropTypes.func()
        }
      })
    })

    describe('when initialized with function value', function () {
      beforeEach(function () {
        ctx.instance = Foo.create({bar () {}})
      })

      itValidatesTheProperty(ctx, false)
      itValidatesOnUpdate(ctx, 'func', 'Expected property bar to be a function')
    })

    describe('when initialized with number value', function () {
      beforeEach(function () {
        ctx.instance = Foo.create({bar: 1})
      })

      itValidatesTheProperty(ctx, false, 'Expected property bar to be a function')
      itValidatesOnUpdate(ctx, 'func', 'Expected property bar to be a function')
    })

    describe('when initialized without value', function () {
      beforeEach(function () {
        ctx.instance = Foo.create()
      })

      itValidatesTheProperty(ctx, false)
      itValidatesOnUpdate(ctx, 'func', 'Expected property bar to be a function')
    })
  })

  describe('when required', function () {
    beforeEach(function () {
      ctx.def = requiredDef
      Foo = Ember.Object.extend(PropTypesMixin, {
        propTypes: {
          bar: PropTypes.func({required: true})
        }
      })
    })

    describe('when initialized with function value', function () {
      beforeEach(function () {
        ctx.instance = Foo.create({bar () {}})
      })

      itValidatesTheProperty(ctx, false)
      itValidatesOnUpdate(ctx, 'func', 'Expected property bar to be a function')
    })

    describe('when initialized with number value', function () {
      beforeEach(function () {
        ctx.instance = Foo.create({bar: 1})
      })

      itValidatesTheProperty(ctx, false, 'Expected property bar to be a function')
      itValidatesOnUpdate(ctx, 'func', 'Expected property bar to be a function')
    })

    describe('when initialized without value', function () {
      beforeEach(function () {
        ctx.instance = Foo.create()
      })

      itValidatesTheProperty(ctx, false, 'Missing required property bar')
      itValidatesOnUpdate(ctx, 'func', 'Expected property bar to be a function')
    })
  })

  describe('when not required', function () {
    beforeEach(function () {
      ctx.def = notRequiredDef
      Foo = Ember.Object.extend(PropTypesMixin, {
        propTypes: {
          bar: PropTypes.func({required: false})
        }
      })
    })

    describe('when initialized with function value', function () {
      beforeEach(function () {
        ctx.instance = Foo.create({bar () {}})
      })

      itValidatesTheProperty(ctx, false)
      itValidatesOnUpdate(ctx, 'func', 'Expected property bar to be a function')
    })

    describe('when initialized with number value', function () {
      beforeEach(function () {
        ctx.instance = Foo.create({bar: 1})
      })

      itValidatesTheProperty(ctx, false, 'Expected property bar to be a function')
      itValidatesOnUpdate(ctx, 'func', 'Expected property bar to be a function')
    })

    describe('when initialized without value', function () {
      beforeEach(function () {
        ctx.instance = Foo.create()
      })

      itValidatesTheProperty(ctx, false)
      itValidatesOnUpdate(ctx, 'func', 'Expected property bar to be a function')
    })
  })

  itSupportsUpdatableOption('func', () => {}, () => {})
})
