/**
 * The PropTypes.EmberComponent validator
 */

import Ember from 'ember'
const {typeOf} = Ember

import logger from '../logger'

export default function (ctx, name, value, def, logErrors, throwErrors) {
  const isObject = typeOf(value) === 'object'

  const valid = isObject && Object.keys(value).some((key) => {
    // NOTE: this is based on internal API and thus could break without warning.
    return key.indexOf('COMPONENT_CELL') === 0
  })

  if (!valid && logErrors) {
    logger.warn(ctx, `Expected property ${name} to be an Ember.Component`, throwErrors)
  }

  return valid
}
