/**
 * Unit test for the PropTypes.EmberComponent validator
 */
import Ember from 'ember'
import {afterEach, beforeEach, describe} from 'mocha'
import sinon from 'sinon'

import {itValidatesTheProperty, spyOnValidateMethods} from 'dummy/tests/helpers/validator'
import PropTypesMixin, {PropTypes} from 'ember-prop-types/mixins/prop-types'

const requiredDef = {
  required: true,
  type: 'EmberComponent'
}

const notRequiredDef = {
  isRequired: requiredDef,
  required: false,
  type: 'EmberComponent'
}

/**
 * Generate object that looks like what {{component}} helper generates
 * @param {String} name - name of component
 * @param {Array} [positionalParams=[]] positional parameters
 * @param {Object} [hash={}] - named parameters
 * @returns {Object} object similar to that of {{component}} helper
 */
function component (name, positionalParams = [], hash = {}) {
  return {
    'COMPONENT_CELL [id=__ember14840705316191443762638799]': true,
    'COMPONENT_HASH [id=__ember14840705316191439762370039]': hash,
    'COMPONENT_PATH [id=__ember1484070531619695987718721]': name,
    'COMPONENT_POSITIONAL_PARAMS [id=__ember1484070531619818135796194]': positionalParams,
    'COMPONENT_SOURCE [id=__ember1484070531619148759557471]': `dummy/pods/components/${name}/template.hbs`
  }
}

describe('Unit / validator / PropTypes.EmberComponent', function () {
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
          bar: PropTypes.EmberComponent.isRequired
        }
      })
    })

    describe('when initialized with {{component}} value', function () {
      beforeEach(function () {
        ctx.instance = Foo.create({bar: component('foo-bar')})
      })

      itValidatesTheProperty(ctx, false)
    })

    describe('when initialized with POJO value', function () {
      beforeEach(function () {
        ctx.instance = Foo.create({bar: {}})
      })

      itValidatesTheProperty(ctx, false, 'Expected property bar to be an Ember.Component')
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
          bar: PropTypes.EmberComponent
        }
      })
    })

    describe('when initialized with {{component}} value', function () {
      beforeEach(function () {
        ctx.instance = Foo.create({bar: component('foo-bar')})
      })

      itValidatesTheProperty(ctx, false)
    })

    describe('when initialized with POJO value', function () {
      beforeEach(function () {
        ctx.instance = Foo.create({bar: {}})
      })

      itValidatesTheProperty(ctx, false, 'Expected property bar to be an Ember.Component')
    })

    describe('when initialized without value', function () {
      beforeEach(function () {
        ctx.instance = Foo.create()
      })

      itValidatesTheProperty(ctx, false)
    })
  })
})
