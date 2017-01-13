/**
 * Unit test for the PropTypesMixin
 */
import {expect} from 'chai'
import Ember from 'ember'
const {Component, Logger, Mixin} = Ember
import {afterEach, beforeEach, describe, it} from 'mocha'
import sinon from 'sinon'

import PropTypesMixin, {PropTypes, helpers, settings} from 'ember-prop-types/mixins/prop-types'

describe('Unit / Mixins / prop-types', function () {
  let sandbox

  beforeEach(function () {
    sandbox = sinon.sandbox.create()
  })

  afterEach(function () {
    sandbox.restore()
  })

  describe('propTypes not defined on Ember.Object', function () {
    beforeEach(function () {
      sandbox.spy(helpers, 'validateProperty')
      const MyObject = Ember.Object.extend(PropTypesMixin, {})
      MyObject.create()
    })

    it('does not call validateProperty', function () {
      expect(helpers.validateProperty).to.have.callCount(0)
    })
  })

  describe('propTypes not defined on Ember.Component', function () {
    beforeEach(function () {
      sandbox.spy(helpers, 'validateProperty')
      const MyComponent = Component.extend(PropTypesMixin, {})
      MyComponent.create()
    })

    it('does not call validateProperty', function () {
      expect(helpers.validateProperty).to.have.callCount(0)
    })
  })

  describe('propTypes defined but empty on Ember.Object', function () {
    beforeEach(function () {
      sandbox.spy(helpers, 'validateProperty')
      const MyObject = Ember.Object.extend(PropTypesMixin, {
        propTypes: {}
      })
      MyObject.create()
    })

    it('does not call validateProperty', function () {
      expect(helpers.validateProperty).to.have.callCount(0)
    })
  })

  describe('propTypes defined but empty on Ember.Component', function () {
    beforeEach(function () {
      sandbox.spy(helpers, 'validateProperty')
      const MyComponent = Component.extend(PropTypesMixin, {
        propTypes: {}
      })
      MyComponent.create()
    })

    it('does not call validateProperty', function () {
      expect(helpers.validateProperty).to.have.callCount(0)
    })
  })

  describe('propTypes defined but unknown type on Ember.Object', function () {
    let MyObject

    beforeEach(function () {
      sandbox.spy(Logger, 'warn')
      sandbox.spy(helpers, 'validateProperty')
      MyObject = Ember.Object.extend(PropTypesMixin, {
        propTypes: {
          foo: PropTypes.doesNotExist
        }
      })
    })

    describe('validate setting not defined', function () {
      let validateSettingOriginalValue

      beforeEach(function () {
        validateSettingOriginalValue = settings.validate
        settings.validate = undefined
        MyObject.create()
      })

      afterEach(function () {
        settings.validate = validateSettingOriginalValue
      })

      it('does not call validateProperty', function () {
        expect(helpers.validateProperty).to.have.callCount(0)
      })

      it('logs warning message', function () {
        expect(Logger.warn).to.have.callCount(1)
      })
    })

    describe('validate setting set to false', function () {
      let validateSettingOriginalValue

      beforeEach(function () {
        validateSettingOriginalValue = settings.validate
        settings.validate = false
        MyObject.create()
      })

      afterEach(function () {
        settings.validate = validateSettingOriginalValue
      })

      it('does not call validateProperty', function () {
        expect(helpers.validateProperty).to.have.callCount(0)
      })

      it('does not log warning message', function () {
        expect(Logger.warn).to.have.callCount(0)
      })
    })

    describe('validate setting set to true', function () {
      let validateSettingOriginalValue

      beforeEach(function () {
        validateSettingOriginalValue = settings.validate
        settings.validate = true
        MyObject.create()
      })

      afterEach(function () {
        settings.validate = validateSettingOriginalValue
      })

      it('does not call validateProperty', function () {
        expect(helpers.validateProperty).to.have.callCount(0)
      })

      it('logs warning message', function () {
        expect(Logger.warn).to.have.callCount(1)
      })
    })
  })

  describe('propTypes defined but unknown type on Ember.Component', function () {
    let MyComponent

    beforeEach(function () {
      sandbox.spy(Logger, 'warn')
      sandbox.spy(helpers, 'validateProperty')
      MyComponent = Component.extend(PropTypesMixin, {
        propTypes: {
          foo: PropTypes.doesNotExist
        }
      })
    })

    describe('validate setting not defined', function () {
      let validateSettingOriginalValue

      beforeEach(function () {
        validateSettingOriginalValue = settings.validate
        settings.validate = undefined
        MyComponent.create()
      })

      afterEach(function () {
        settings.validate = validateSettingOriginalValue
      })

      it('does not call validateProperty', function () {
        expect(helpers.validateProperty).to.have.callCount(0)
      })

      it('logs warning message', function () {
        expect(Logger.warn).to.have.callCount(1)
      })
    })

    describe('validate setting set to false', function () {
      let validateSettingOriginalValue

      beforeEach(function () {
        validateSettingOriginalValue = settings.validate
        settings.validate = false
        MyComponent.create()
      })

      afterEach(function () {
        settings.validate = validateSettingOriginalValue
      })

      it('does not call validateProperty', function () {
        expect(helpers.validateProperty).to.have.callCount(0)
      })

      it('does not log warning message', function () {
        expect(Logger.warn).to.have.callCount(0)
      })
    })

    describe('validate setting set to true', function () {
      let validateSettingOriginalValue

      beforeEach(function () {
        validateSettingOriginalValue = settings.validate
        settings.validate = true
        MyComponent.create()
      })

      afterEach(function () {
        settings.validate = validateSettingOriginalValue
      })

      it('does not call validateProperty', function () {
        expect(helpers.validateProperty).to.have.callCount(0)
      })

      it('logs warning message', function () {
        expect(Logger.warn).to.have.callCount(1)
      })
    })
  })

  describe('propTypes defined with validations present on Ember.Object', function () {
    let instance
    beforeEach(function () {
      sandbox.spy(helpers, 'validateProperty')
      const MyObject = Ember.Object.extend(PropTypesMixin, {
        propTypes: {
          foo: PropTypes.string,
          bar: PropTypes.number
        }
      })
      instance = MyObject.create()
    })

    ;['foo', 'bar'].forEach((prop) => {
      it(`should call validateProperty() for ${prop}`, function () {
        expect(helpers.validateProperty).to.have.been.calledWith(instance, prop)
      })
    })
  })

  describe('propTypes defined with validations present on Ember.Component', function () {
    let instance
    beforeEach(function () {
      sandbox.spy(helpers, 'validateProperty')
      const MyComponent = Component.extend(PropTypesMixin, {
        getDefaultProps () {
          return {
            foo: '!foo',
            bar: 647
          }
        }
      })
      instance = MyComponent.create()
    })

    it('should set defaults for each property', function () {
      expect(instance.get('foo')).to.equal('!foo')
      expect(instance.get('bar')).to.equal(647)
    })
  })

  describe('propTypes defined with validations present on Ember.Component and Ember.Mixin', function () {
    let instance
    beforeEach(function () {
      sandbox.spy(helpers, 'validateProperty')
      const MyMixin = Mixin.create(PropTypesMixin, {
        propTypes: {
          baz: PropTypes.string,
          quux: PropTypes.number
        }
      })

      const MyComponent = Component.extend(PropTypesMixin, MyMixin, {
        propTypes: {
          foo: PropTypes.string,
          bar: PropTypes.number
        }
      })
      instance = MyComponent.create()
    })

    ;['foo', 'bar', 'baz', 'quux'].forEach((prop) => {
      it(`should call validateProperty() for ${prop}`, function () {
        expect(helpers.validateProperty).to.have.been.calledWith(instance, prop)
      })
    })
  })

  describe('propTypes defined with defaults present on Ember.Object', function () {
    let instance
    beforeEach(function () {
      sandbox.spy(helpers, 'validateProperty')
      const MyObject = Ember.Object.extend(PropTypesMixin, {
        getDefaultProps () {
          return {
            foo: '!foo',
            bar: 647
          }
        }
      })
      instance = MyObject.create()
    })

    it('should set defaults for each property', function () {
      expect(instance.get('foo')).to.equal('!foo')
      expect(instance.get('bar')).to.equal(647)
    })
  })

  describe('propTypes defined with defaults present on Ember.Component', function () {
    let instance
    beforeEach(function () {
      sandbox.spy(helpers, 'validateProperty')
      const MyComponent = Component.extend(PropTypesMixin, {
        propTypes: {
          foo: PropTypes.string,
          bar: PropTypes.number
        },
        getDefaultProps () {
          return {
            foo: '!foo',
            bar: 647
          }
        }
      })
      instance = MyComponent.create()
    })

    ;['foo', 'bar'].forEach((prop) => {
      it(`should call validateProperty() for ${prop}`, function () {
        expect(helpers.validateProperty).to.have.been.calledWith(instance, prop)
      })
    })

    it('should set defaults for each property', function () {
      expect(instance.get('foo')).to.equal('!foo')
      expect(instance.get('bar')).to.equal(647)
    })
  })

  describe('propTypes defined with validations and defaults present on Ember.Object', function () {
    let instance
    beforeEach(function () {
      sandbox.spy(helpers, 'validateProperty')
      const Object = Ember.Object.extend(PropTypesMixin, {
        propTypes: {
          foo: PropTypes.string,
          bar: PropTypes.number
        },
        getDefaultProps () {
          return {
            foo: '!foo',
            bar: 647
          }
        }
      })
      instance = Object.create()
    })

    ;['foo', 'bar'].forEach((prop) => {
      it(`should call validateProperty() for ${prop}`, function () {
        expect(helpers.validateProperty).to.have.been.calledWith(instance, prop)
      })
    })

    it('should set defaults for each property', function () {
      expect(instance.get('foo')).to.equal('!foo')
      expect(instance.get('bar')).to.equal(647)
    })
  })

  describe('propTypes defined with validations and defaults present on Ember.Component', function () {
    let instance
    beforeEach(function () {
      sandbox.spy(helpers, 'validateProperty')
      const MyComponent = Component.extend(PropTypesMixin, {
        propTypes: {
          foo: PropTypes.string,
          bar: PropTypes.number
        },
        getDefaultProps () {
          return {
            foo: '!foo',
            bar: 647
          }
        }
      })
      instance = MyComponent.create()
    })

    ;['foo', 'bar'].forEach((prop) => {
      it(`should call validateProperty() for ${prop}`, function () {
        expect(helpers.validateProperty).to.have.been.calledWith(instance, prop)
      })
    })

    it('should set defaults for each property', function () {
      expect(instance.get('foo')).to.equal('!foo')
      expect(instance.get('bar')).to.equal(647)
    })
  })

  describe('propTypes defined with validations and defaults present on Ember.Component and Ember.Mixin', function () {
    let instance
    beforeEach(function () {
      sandbox.spy(helpers, 'validateProperty')
      const MyMixin = Mixin.create(PropTypesMixin, {
        propTypes: {
          baz: PropTypes.string,
          quux: PropTypes.number
        },
        getDefaultProps () {
          return {
            foo: 'INVALID',
            baz: '!baz',
            quux: '!quux'
          }
        }
      })

      const MyComponent = Component.extend(PropTypesMixin, MyMixin, {
        propTypes: {
          foo: PropTypes.string,
          bar: PropTypes.number
        },
        getDefaultProps () {
          return {
            foo: '!foo',
            bar: 647
          }
        }
      })
      instance = MyComponent.create()
    })

    ;['foo', 'bar', 'baz', 'quux'].forEach((prop) => {
      it(`should call validateProperty() for ${prop}`, function () {
        expect(helpers.validateProperty).to.have.been.calledWith(instance, prop)
      })
    })

    it('should set defaults for each property', function () {
      expect(instance.get('foo')).to.equal('!foo')
      expect(instance.get('bar')).to.equal(647)
      expect(instance.get('baz')).to.equal('!baz')
      expect(instance.get('quux')).to.equal('!quux')
    })
  })

  describe('applies defaults when user set value is undefined', function () {
    let instance

    beforeEach(function () {
      sandbox.spy(helpers, 'validateProperty')

      const MyObject = Ember.Object.extend(PropTypesMixin, {
        getDefaultProps () {
          return {
            foo: 'bar'
          }
        }
      })

      instance = MyObject.create({
        foo: undefined
      })
    })

    it('should set defaults for each property', function () {
      expect(instance.get('foo')).to.equal('bar')
    })
  })
})
