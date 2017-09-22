/**
 * The PropTypesMixin definition
 */
import Ember from 'ember'
const {Mixin, get, getWithDefault, typeOf, assign, merge} = Ember
import config from 'ember-get-config'

import PropTypes, {getDef, logger, validators} from '../utils/prop-types'

const assign = Object.assign || assign || merge

export const settings = {
  requireComponentPropTypes: getWithDefault(
    config, 'ember-prop-types.requireComponentPropTypes', false
  ),
  spreadProperty: get(config, 'ember-prop-types.spreadProperty'),
  throwErrors: getWithDefault(config, 'ember-prop-types.throwErrors', false),
  validate: get(config, 'ember-prop-types.validate'),
  validateOnUpdate: getWithDefault(config, 'ember-prop-types.validateOnUpdate', false)
}

export const helpers = {
  handleError (ctx, message) {
    logger.warn(ctx, message, settings.throwErrors)
  },

  /* eslint-disable complexity */
  validateProperty (ctx, name, def) {
    let value = get(ctx, name)

    if (value === undefined && settings.spreadProperty) {
      value = get(ctx, `${settings.spreadProperty}.${name}`)
    }

    if (value === undefined) {
      if (!def.required) {
        return
      }

      helpers.handleError(ctx, `Missing required property ${name}`)

      return
    }

    if (def.type in validators) {
      validators[def.type](ctx, name, value, def, true, settings.throwErrors)
    } else {
      helpers.handleError(ctx, `Unknown propType ${def.type}`)
    }
  },
  /* eslint-enable complexity */

  validatePropTypes (ctx) {
    const disabledForEnv = settings.validate === false
    const isProduction = !config || config.environment === 'production'
    const settingMissing = settings.validate === undefined

    if (
      disabledForEnv ||
      (settingMissing && isProduction)
    ) {
      return
    }

    const propTypesArray = [].concat(ctx.get('propTypes'))
    propTypesArray.forEach((propType) => {
      if (!propType) {
        return
      }

      Object.keys(propType).forEach(name => {
        const def = getDef(propType[name])

        if (def === undefined) {
          helpers.handleError(ctx, `propType for ${name} is unknown`)
          return
        }

        if (settings.validateOnUpdate) {
          ctx.addObserver(name, ctx, function () {
            if (def.updatable === false) {
              helpers.handleError(ctx, `${name} should not be updated`)
              return
            }

            helpers.validateProperty(this, name, def)
          })
        }

        helpers.validateProperty(ctx, name, def)
      })
    })
  }
}

export default Mixin.create({
  concatenatedProperties: ['propTypes', 'getDefaultProps'],

  getDefaultProps () {
    // Maintain compatibility for 2.x users calling this._super
    return {}
  },

  init () {
    helpers.validatePropTypes(this)

    // Note defaults is a concatenated property so this is actually an array
    // of getDefaultProps() methods all the way up the inheritance chain
    const defaults = this.get('getDefaultProps')

    // Keep a record of any properties that came from a getDefaultProps call
    // - let child getDefaultProps functions take precedence over parents
    // - let child getDefaultProps have _access_ to parent values set by getDefaultProps
    // - don't apply defaults for properties set explicitly on the target object
    const defaultedProps = {}

    defaults.forEach((propsFunction) => {
      // If for some reason getDefaultProps() isn't a function we'll simply
      // ignore it. In the future we might want to actually assert an error
      // here.
      if (typeOf(propsFunction) !== 'function') return

      // Now let's actually call the getDefaultProps() method
      const defaultProps = propsFunction.apply(this)

      // Now iterate defaults and remove any properties that already have
      // values set on this instance _that didn't come from a previous
      // getDefaultProps_
      Object.keys(defaultProps).forEach((key) => {
        if (this.get(key) !== undefined && get(defaultedProps, key) === undefined) {
          delete defaultProps[key]
        }
      })

      // Record the properties that were defaulted
      assign(defaultedProps, defaultProps)

      // Apply the defaults for this layer of the hierarchy immediately
      // @sglanzer 2017-05-29 PR #118 delayed the execution of the setProperties
      // until the end of all the getDefaultProps() calls, which meant that parent
      // layers in the getDefaultProps() hierarchy weren't available for use in
      // child functions.  This broke backwards compatibility
      // concatenated defaults with the results of this method call.
      this.setProperties(defaultProps)
    })

    this._super(...arguments)
  }
})

export {PropTypes}
