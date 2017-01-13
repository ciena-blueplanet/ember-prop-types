/**
 * Unit test for the PropTypes.oneOfType validator
 */
import {expect} from 'chai'
import Ember from 'ember'
const {Logger} = Ember
import {afterEach, beforeEach, describe, it} from 'mocha'
import sinon from 'sinon'

import {itValidatesTheProperty, spyOnValidateMethods} from 'dummy/tests/helpers/validator'
import PropTypesMixin, {PropTypes} from 'ember-prop-types/mixins/prop-types'

const numberTypeDef = {
  isRequired: {
    required: true,
    type: 'number'
  },
  required: false,
  type: 'number'
}

const stringTypeDef = {
  isRequired: {
    required: true,
    type: 'string'
  },
  required: false,
  type: 'string'
}

const requiredDef = {
  required: true,
  type: 'oneOfType',
  typeDefs: [numberTypeDef, stringTypeDef]
}

const notRequiredDef = {
  required: false,
  type: 'oneOfType',
  typeDefs: [numberTypeDef, stringTypeDef]
}

describe('Unit / validator / PropTypes.oneOfType', function () {
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
          bar: PropTypes.oneOfType(
            [
              PropTypes.number,
              PropTypes.string
            ],
            {
              required: true
            }
          )
        }
      })
    })

    describe('when initialized with number instance', function () {
      beforeEach(function () {
        ctx.instance = Foo.create({bar: 1})
      })

      itValidatesTheProperty(ctx, false)
    })

    describe('when initialized with string instance', function () {
      beforeEach(function () {
        ctx.instance = Foo.create({bar: 'test'})
      })

      itValidatesTheProperty(ctx, false)
    })

    describe('when initialized with boolean instance', function () {
      beforeEach(function () {
        ctx.instance = Foo.create({bar: true})
      })

      itValidatesTheProperty(ctx, false, 'Property bar does not match expected types: number, string')
    })

    describe('when initialized without value', function () {
      beforeEach(function () {
        ctx.instance = Foo.create()
      })

      itValidatesTheProperty(ctx, false, 'Missing required property bar')
    })
  })

  describe('when not required', function () {
    let Foo

    beforeEach(function () {
      ctx.def = notRequiredDef
      Foo = Ember.Object.extend(PropTypesMixin, {
        propTypes: {
          bar: PropTypes.oneOfType(
            [
              PropTypes.number,
              PropTypes.string
            ],
            {
              required: false
            }
          )
        }
      })
    })

    describe('when initialized with number instance', function () {
      beforeEach(function () {
        ctx.instance = Foo.create({bar: 1})
      })

      itValidatesTheProperty(ctx, false)
    })

    describe('when initialized with string instance', function () {
      beforeEach(function () {
        ctx.instance = Foo.create({bar: 'test'})
      })

      itValidatesTheProperty(ctx, false)
    })

    describe('when initialized with boolean instance', function () {
      beforeEach(function () {
        ctx.instance = Foo.create({bar: true})
      })

      itValidatesTheProperty(ctx, false, 'Property bar does not match expected types: number, string')
    })

    describe('when initialized without value', function () {
      beforeEach(function () {
        ctx.instance = Foo.create()
      })

      itValidatesTheProperty(ctx, false)
    })
  })

  describe('when updatable', function () {
    beforeEach(function () {
      Logger.warn.reset()

      ctx.def = {
        required: false,
        type: 'oneOfType',
        updatable: true
      }

      const Foo = Ember.Object.extend(PropTypesMixin, {
        propTypes: {
          bar: PropTypes.oneOfType([PropTypes.null, PropTypes.string], {updatable: true})
        }
      })

      ctx.instance = Foo.create({bar: null})
    })

    describe('when updated', function () {
      beforeEach(function () {
        ctx.instance.set('bar', 'test')
      })

      it('does not log warning', function () {
        expect(Logger.warn.called).to.equal(false)
      })
    })
  })

  describe('when not updatable', function () {
    beforeEach(function () {
      Logger.warn.reset()

      ctx.def = {
        required: false,
        type: 'oneOfType',
        updatable: false
      }

      const Foo = Ember.Object.extend(PropTypesMixin, {
        propTypes: {
          bar: PropTypes.oneOfType([PropTypes.null, PropTypes.string], {updatable: false})
        }
      })

      ctx.instance = Foo.create({bar: null})
    })

    describe('when updated', function () {
      beforeEach(function () {
        ctx.instance.set('bar', 'test')
      })

      it('logs warning', function () {
        expect(Logger.warn.called).to.equal(true)
        expect(Logger.warn).to.have.been.calledWith(
          `[${ctx.instance.toString()}]: bar should not be updated`
        )
      })
    })
  })
})
