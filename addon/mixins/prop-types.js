/**
 * The PropTypesMixin definition
 */
import Ember from 'ember'
const {Mixin, getWithDefault, typeOf} = Ember
import config from 'ember-get-config'

import PropTypes, {logger, validators} from '../utils/prop-types'

const helpers = {
  /* eslint-disable complexity */
  validateProperty (ctx, name, def) {
    const value = ctx.get(name)

    if (value === undefined) {
      if (!def.required) {
        return
      }

      logger.warn(ctx, `Missing required property: ${name}`)

      return
    }

    if (def.type in validators) {
      validators[def.type](ctx, name, value, def, true)
    } else {
      logger.warn(ctx, `Unknown propType: ${def.type}`)
    }
  },
  /* eslint-enable complexity */

  validatePropTypes (ctx) {
    if (!config || config.environment === 'production') {
      return
    }

    const propTypesArray = [].concat(ctx.get('propTypes'))
    propTypesArray.forEach((propType) => {
      if (!propType) {
        return
      }

      Object.keys(propType).forEach(name => {
        const def = propType[name]

        if (def === undefined) {
          logger.warn(ctx, `propType for "${name}" is unknown`)
          return
        }

        if (getWithDefault(config, 'ember-prop-types.validateOnUpdate', false)) {
          ctx.addObserver(name, ctx, function () {
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

    const keys = Object.keys(this)
    const defaults = this.get('getDefaultProps')
    defaults.forEach((propsFunction) => {
      if (typeOf(propsFunction) !== 'function') {
        return
      }

      const defaultProps = propsFunction.apply(this)
      keys.forEach((key) => {
        if (this.get(key) !== undefined) {
          delete defaultProps[key]
        }
      })

      this.setProperties(defaultProps)
    })
    this._super(...arguments)
  }
})

export {helpers, PropTypes}
