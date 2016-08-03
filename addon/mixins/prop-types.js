import Ember from 'ember'
const {
  typeOf
} = Ember
import PropTypes, {validators} from '../utils/prop-types'
import config from 'ember-get-config'

const helpers = {
  /* eslint-disable complexity */
  validateProperty (ctx, name, def) {
    const value = ctx.get(name)

    if (value === undefined) {
      if (!def.required) {
        return
      }

      Ember.Logger.warn(`Missing required property ${name}`)

      return
    }

    if (def.type in validators) {
      validators[def.type](ctx, name, value, def, true)
    } else {
      Ember.Logger.warn(`Unknown propType ${def.type}`)
    }
  },
  /* eslint-enable complexity */

  validatePropTypes (ctx) {
    if (!config || config.environment === 'production') {
      return
    }

    const propTypes = ctx.get('propTypes')

    if (!propTypes) {
      return
    }

    Object.keys(propTypes).forEach(name => {
      const def = propTypes[name]

      if (def === undefined) {
        Ember.Logger.warn(`propType for ${name} is unknown`)
        return
      }

      helpers.validateProperty(ctx, name, def)
    })
  }
}

export default Ember.Mixin.create({
  init () {
    helpers.validatePropTypes(this)

    if (typeOf(this.getDefaultProps) === 'function') {
      const presentPropKeys = Object.keys(this)
      const defaultProps = this.getDefaultProps()

      const needsDefaultProp = Object.assign({}, ...(Object.keys(defaultProps).map((key) => {
        if (!presentPropKeys.hasOwnProperty(key)) {
          return {
            [key]: defaultProps[key]
          }
        }
      })))

      this.setProperties(needsDefaultProp)
    }

    this._super()
  }
})

export {helpers, PropTypes}
