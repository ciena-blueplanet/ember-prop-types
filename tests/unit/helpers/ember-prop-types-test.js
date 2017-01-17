/**
 * Unit test for the frost-power-display component
 */

// Because we want to satisfy ESLint rules for not using references that were not previously defined...
// ...AND... we need to be able to spy on the same methods we need to import the "mocha" library twice,
// which is why the second import of it disables the ESLint warning about such duplication on a per-line basis
import {expect} from 'chai'
import Ember from 'ember'
import {afterEach, beforeEach, describe, it} from 'mocha'
import * as spyOnMocha from 'mocha' // eslint-disable-line no-duplicate-imports
import sinon from 'sinon'
import validatePropTypes, * as PropTypesHelper from 'dummy/tests/helpers/ember-prop-types'

describe('Unit / helpers / ember-prop-types', function () {
  describe('createMessages()', function () {
    it('should return empty array when provided all empty arguments', function () {
      const result = PropTypesHelper.forTestingOnly.createMessages()

      expect(result).to.eql([])
    })

    it('should create error message for different properties when only data passed', function () {
      const result = PropTypesHelper.forTestingOnly.createMessages(['a', 'b'], [], [])

      expect(result[0]).to.eql('The following propTypes are different than expected: a, b')
    })

    it('should create error message for missing properties when only data passed', function () {
      const result = PropTypesHelper.forTestingOnly.createMessages([], ['a', 'b'], [])

      expect(result[0]).to.eql('The following propTypes were not found but are expected: a, b')
    })

    it('should create error message for unexpected properties when only data passed', function () {
      const result = PropTypesHelper.forTestingOnly.createMessages([], [], ['a', 'b'])

      expect(result[0]).to.eql('The following propTypes were found but not expected in the test: a, b')
    })

    describe('should create error message for', function () {
      let result

      beforeEach(function () {
        result = PropTypesHelper.forTestingOnly.createMessages(['a', 'b'], ['c', 'd'], ['e', 'f'])
      })

      it('different properties when all data is passed', function () {
        expect(result[0]).to.eql('The following propTypes are different than expected: a, b')
      })

      it('missing properties when all data is passed', function () {
        expect(result[1]).to.eql('The following propTypes were not found but are expected: c, d')
      })

      it('unexpected properties when all data is passed', function () {
        expect(result[2]).to.eql('The following propTypes were found but not expected in the test: e, f')
      })
    })
  })

  describe('findDifferentProperties()', function () {
    it('should return an empty array when given no arguments', function () {
      const result = PropTypesHelper.forTestingOnly.findDifferentProperties()

      expect(result).to.eql([])
    })

    it('should return an empty array when there are no different properties', function () {
      const defined = {
        a: null,
        b: null
      }
      const expected = {
        a: null,
        b: null
      }
      const result = PropTypesHelper.forTestingOnly.findDifferentProperties(defined, expected)

      expect(result).to.eql([])
    })

    it('should return properties that are specified but not correctly', function () {
      const defined = {
        a: {
          another: true
        },
        b: {
          another: true
        },
        c: {
          another: true
        }
      }
      const expected = {
        a: {
          another: true
        },
        b: {
          another: null
        },
        c: {
          another: true
        }
      }
      const result = PropTypesHelper.forTestingOnly.findDifferentProperties(defined, expected)

      expect(result).to.eql(['b'])
    })
  })

  describe('findMissingProperties()', function () {
    it('should return an empty array when given no arguments', function () {
      const result = PropTypesHelper.forTestingOnly.findMissingProperties()

      expect(result).to.eql([])
    })

    it('should return an empty array when there are no missing properties', function () {
      const defined = {
        a: null,
        b: null
      }
      const expected = {
        a: null,
        b: null
      }
      const result = PropTypesHelper.forTestingOnly.findMissingProperties(defined, expected)

      expect(result).to.eql([])
    })

    it('should return properties that are missing', function () {
      const defined = {
        a: {
          another: true
        },
        c: {
          another: true
        }
      }
      const expected = {
        a: {
          another: true
        },
        b: {
          another: null
        },
        c: {
          another: true
        }
      }
      const result = PropTypesHelper.forTestingOnly.findMissingProperties(defined, expected)

      expect(result).to.eql(['b'])
    })
  })

  describe('findUnexpectedProperties()', function () {
    it('should return an empty array when given no arguments', function () {
      const result = PropTypesHelper.forTestingOnly.findUnexpectedProperties()

      expect(result).to.eql([])
    })

    it('should return an empty array when there are no unexpected properties', function () {
      const defined = {
        a: null,
        b: null,
        c: null
      }
      const expected = {
        a: null,
        b: null,
        c: null
      }
      const result = PropTypesHelper.forTestingOnly.findUnexpectedProperties(defined, expected)

      expect(result).to.eql([])
    })

    it('should return properties that are not expected', function () {
      const defined = {
        a: null,
        b: null,
        c: null
      }
      const expected = {
        b: null
      }
      const result = PropTypesHelper.forTestingOnly.findUnexpectedProperties(defined, expected)

      expect(result).to.eql(['a', 'c'])
    })
  })

  describe('getInstance()', function () {
    it('creates an instance if passed a class', function () {
      const result = PropTypesHelper.forTestingOnly.getInstance(Ember.Object)

      expect(result instanceof Ember.Object).to.eql(true)
    })

    it('instances are passed through', function () {
      const result = PropTypesHelper.forTestingOnly.getInstance(Ember.Object.create())

      expect(result instanceof Ember.Object).to.eql(true)
    })
  })

  /**
   * 17 Jan 2017 - Jeremy Brown: The configuration of this test does not follow the preferred
   * format of other tests. This is due to the fact that `validatePropTypes()` makes use of
   * `expect()` and `it()` calls and that we are needing to use the same calls to test calls
   * to them.  A little bit of code-ception if you will.  Therefore this setup strikes a
   * balance between the desired format, desired test coverage, and what could be accomplished.
   */
  describe('validatePropTypes()', function () {
    let sandbox = sinon.sandbox.create()
    let spyExpect = sandbox.spy(PropTypesHelper.forTestingOnly, 'expect')
    let spyIt = sandbox.spy(spyOnMocha, 'it')
    const testObject = Ember.Object.create({
      propTypes: [
        {
          a: '1a',
          b: '2b',
          c: '3c'
        }
      ]
    })

    afterEach(function () {
      sandbox.restore()
    })

    describe('should correctly integrate into mocha ecosystem by', function () {
      // It is important that this call remain outside of a `beforeEach()` because otherwise
      // it will mess up the ability for the first `it()` below to function correctly
      validatePropTypes(
        testObject,
        {
          a: '1a',
          b: '2b',
          c: '3c'
        }
      )

      // It is important that this remain the first call to `it()` in this `describe()` in
      // order for the correct `it()` to be spied on
      it('calling it()', function () {
        expect(spyIt.firstCall.args[0]).to.eql('should have correct PropType validations')
      })

      it('calling expect() once', function () {
        // It is important that the `validatePropTypes()` call remain within this `it()`
        // in order for timing and spying to function correctly
        validatePropTypes(
          testObject,
          {
            a: '1a',
            b: '2b',
            c: '3c'
          }
        )

        expect(spyExpect.callCount).to.eql(1)
      })

      it('calling expect() with an empty array', function () {
        // It is important that the `validatePropTypes()` call remain within this `it()`
        // in order for timing and spying to function correctly
        validatePropTypes(
          testObject,
          {
            a: '1a',
            b: '2b',
            c: '3c'
          }
        )

        expect(spyExpect.calledWith([])).to.eql(true)
      })
    })
  })
})
