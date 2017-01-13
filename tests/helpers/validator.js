/**
 * Test helpers for testing a validator
 */
import {expect} from 'chai'
import Ember from 'ember'
const {Logger} = Ember
import {after, before, beforeEach, describe, it} from 'mocha'

import PropTypesMixin, {PropTypes, helpers, settings} from 'ember-prop-types/mixins/prop-types'
import logger from 'ember-prop-types/utils/logger'

export function itSupportsUpdatableOption (type, value1, value2) {
  let ctx = {propertyName: 'bar'}

  describe('when updatable', function () {
    beforeEach(function () {
      Logger.warn.reset()

      ctx.def = {
        required: false,
        type,
        updatable: true
      }

      const Foo = Ember.Object.extend(PropTypesMixin, {
        propTypes: {
          bar: PropTypes[type]({updatable: true})
        }
      })

      ctx.instance = Foo.create({bar: value1})
    })

    describe('when updated', function () {
      beforeEach(function () {
        ctx.instance.set('bar', value2)
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
        type,
        updatable: false
      }

      const Foo = Ember.Object.extend(PropTypesMixin, {
        propTypes: {
          bar: PropTypes[type]({updatable: false})
        }
      })

      ctx.instance = Foo.create({bar: value1})
    })

    describe('when updated', function () {
      beforeEach(function () {
        ctx.instance.set('bar', value2)
      })

      it('logs warning', function () {
        expect(Logger.warn.called).to.equal(true)
        expect(Logger.warn).to.have.been.calledWith(
          `[${ctx.instance.toString()}]: bar should not be updated`
        )
      })
    })
  })
}

export function itValidatesOnUpdate (ctx, type, warningMessage) {
  describe('when throwErrors set to false', function () {
    let throwErrorsOriginalValue

    before(function () {
      throwErrorsOriginalValue = settings.throwErrors
      settings.throwErrors = false
    })

    beforeEach(function () {
      Logger.warn.reset()
      logger.throwError.reset()
    })

    after(function () {
      settings.throwErrors = throwErrorsOriginalValue
    })

    describe('updated with array value', function () {
      beforeEach(function () {
        ctx.instance.set('bar', [])
      })

      if (type === 'array') {
        itValidatesTheProperty(ctx, false)
      } else {
        itValidatesTheProperty(ctx, false, warningMessage)
      }
    })

    describe('updated with boolean value', function () {
      beforeEach(function () {
        ctx.instance.set('bar', false)
      })

      if (type === 'bool') {
        itValidatesTheProperty(ctx, false)
      } else {
        itValidatesTheProperty(ctx, false, warningMessage)
      }
    })

    describe('updated with element value', function () {
      beforeEach(function () {
        ctx.instance.set('bar', document.createElement('span'))
      })

      if (['element', 'object'].indexOf(type) !== -1) {
        itValidatesTheProperty(ctx, false)
      } else {
        itValidatesTheProperty(ctx, false, warningMessage)
      }
    })

    describe('updated with function value', function () {
      beforeEach(function () {
        ctx.instance.set('bar', () => {})
      })

      if (type === 'func') {
        itValidatesTheProperty(ctx, false)
      } else {
        itValidatesTheProperty(ctx, false, warningMessage)
      }
    })

    describe('updated with null value', function () {
      beforeEach(function () {
        ctx.instance.set('bar', null)
      })

      if (type === 'null') {
        itValidatesTheProperty(ctx, false)
      } else {
        itValidatesTheProperty(ctx, false, warningMessage)
      }
    })

    describe('updated with number value', function () {
      beforeEach(function () {
        ctx.instance.set('bar', 2)
      })

      if (type === 'number') {
        itValidatesTheProperty(ctx, false)
      } else {
        itValidatesTheProperty(ctx, false, warningMessage)
      }
    })

    describe('updated with object value', function () {
      beforeEach(function () {
        ctx.instance.set('bar', {})
      })

      if (type === 'object') {
        itValidatesTheProperty(ctx, false)
      } else {
        itValidatesTheProperty(ctx, false, warningMessage)
      }
    })

    describe('updated with string value', function () {
      beforeEach(function () {
        ctx.instance.set('bar', 'spam')
      })

      if (type === 'string') {
        itValidatesTheProperty(ctx, false)
      } else {
        itValidatesTheProperty(ctx, false, warningMessage)
      }
    })

    describe('updated with symbol value', function () {
      beforeEach(function () {
        ctx.instance.set('bar', Symbol())
      })

      if (['object', 'symbol'].indexOf(type) !== -1) {
        itValidatesTheProperty(ctx, false)
      } else {
        itValidatesTheProperty(ctx, false, warningMessage)
      }
    })
  })

  describe('when throwErrors set to true', function () {
    let throwErrorsOriginalValue

    before(function () {
      throwErrorsOriginalValue = settings.throwErrors
      settings.throwErrors = true
    })

    beforeEach(function () {
      Logger.warn.reset()
      logger.throwError.reset()
    })

    after(function () {
      settings.throwErrors = throwErrorsOriginalValue
    })

    describe('updated with array value', function () {
      beforeEach(function () {
        ctx.instance.set('bar', [])
      })

      if (type === 'array') {
        itValidatesTheProperty(ctx, true)
      } else {
        itValidatesTheProperty(ctx, true, warningMessage)
      }
    })

    describe('updated with boolean value', function () {
      beforeEach(function () {
        ctx.instance.set('bar', false)
      })

      if (type === 'bool') {
        itValidatesTheProperty(ctx, true)
      } else {
        itValidatesTheProperty(ctx, true, warningMessage)
      }
    })

    describe('updated with element value', function () {
      beforeEach(function () {
        ctx.instance.set('bar', document.createElement('span'))
      })

      if (['element', 'object'].indexOf(type) !== -1) {
        itValidatesTheProperty(ctx, true)
      } else {
        itValidatesTheProperty(ctx, true, warningMessage)
      }
    })

    describe('updated with function value', function () {
      beforeEach(function () {
        ctx.instance.set('bar', () => {})
      })

      if (type === 'func') {
        itValidatesTheProperty(ctx, true)
      } else {
        itValidatesTheProperty(ctx, true, warningMessage)
      }
    })

    describe('updated with null value', function () {
      beforeEach(function () {
        ctx.instance.set('bar', null)
      })

      if (type === 'null') {
        itValidatesTheProperty(ctx, true)
      } else {
        itValidatesTheProperty(ctx, true, warningMessage)
      }
    })

    describe('updated with number value', function () {
      beforeEach(function () {
        ctx.instance.set('bar', 2)
      })

      if (type === 'number') {
        itValidatesTheProperty(ctx, true)
      } else {
        itValidatesTheProperty(ctx, true, warningMessage)
      }
    })

    describe('updated with object value', function () {
      beforeEach(function () {
        ctx.instance.set('bar', {})
      })

      if (type === 'object') {
        itValidatesTheProperty(ctx, true)
      } else {
        itValidatesTheProperty(ctx, true, warningMessage)
      }
    })

    describe('updated with string value', function () {
      beforeEach(function () {
        ctx.instance.set('bar', 'spam')
      })

      if (type === 'string') {
        itValidatesTheProperty(ctx, true)
      } else {
        itValidatesTheProperty(ctx, true, warningMessage)
      }
    })

    describe('updated with symbol value', function () {
      beforeEach(function () {
        ctx.instance.set('bar', Symbol())
      })

      if (['object', 'symbol'].indexOf(type) !== -1) {
        itValidatesTheProperty(ctx, true)
      } else {
        itValidatesTheProperty(ctx, true, warningMessage)
      }
    })
  })
}

/**
 * Ensure that the proper validation methods are called and that no warning is logged
 *
 * NOTE: you must first call spyOnValidateMethods() to set up the stubs/spies this helper depends on
 * and don't forget, that has to be BEFORE you create your object and its init() method is called.
 *
 * @param {Object} ctx - the test context
 * @param {Object} ctx.def - the propType definition
 * @param {Object} ctx.instance - the object instance that has the mixin
 * @param {String} ctx.propertyName - the object instance that has the mixin
 * @param {Boolean} throwErrors - whether or not errors should be thrown
 * @param {String[]} [warningMessages] - if present, expect Logger.warn to be called with them, else expect no warnings
 */
export function itValidatesTheProperty (ctx, throwErrors, ...warningMessages) {
  let def, instance, propertyName

  beforeEach(function () {
    def = ctx.def
    instance = ctx.instance
    propertyName = ctx.propertyName
  })

  it('should validate prop-types for instance', function () {
    expect(helpers.validatePropTypes).to.have.been.calledWith(instance)
  })

  it(`should validate the property "${ctx.propertyName}"`, function () {
    expect(helpers.validateProperty).to.have.been.calledWith(instance, propertyName, def)
  })

  if (throwErrors) {
    if (warningMessages.length > 0) {
      it('should throw errors', function () {
        expect(logger.throwError).to.have.callCount(warningMessages.length)
        warningMessages.forEach((msg) => {
          expect(logger.throwError).to.have.been.calledWith(`[${instance.toString()}]: ${msg}`)
        })
      })
    } else {
      it('should not throw errors', function () {
        expect(logger.throwError).to.have.callCount(0)
      })
    }

    it('should not log warning', function () {
      expect(Logger.warn).to.have.callCount(0)
    })
  } else {
    if (warningMessages.length > 0) {
      it('should log warning(s)', function () {
        expect(Logger.warn).to.have.callCount(warningMessages.length)
        warningMessages.forEach((msg) => {
          expect(Logger.warn).to.have.been.calledWith(`[${instance.toString()}]: ${msg}`)
        })
      })
    } else {
      it('should not log warning', function () {
        expect(Logger.warn).to.have.callCount(0)
      })
    }

    it('should not throw errors', function () {
      expect(logger.throwError).to.have.callCount(0)
    })
  }
}

/**
 * Spy/stub the appropriate validation methods used by the itValidatesTheProperty() helper
 * @param {*} sandbox - the sinon sandbox instance to use to stub/spy
 */
export function spyOnValidateMethods (sandbox) {
  sandbox.stub(logger, 'throwError')
  sandbox.spy(helpers, 'validatePropTypes')
  sandbox.spy(helpers, 'validateProperty')
  sandbox.stub(Logger, 'warn')
}
