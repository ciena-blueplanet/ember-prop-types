/**
 * The PropTypes.EmberComponent validator
 */

import {typeOf} from '@ember/utils'

import logger from '../logger'

export default function (ctx, name, value, def, logErrors, throwErrors) {
  const isObject = typeOf(value) === 'object'

  const valid = isObject && Object.keys(value).some((key) => {
    // NOTE: this is based on internal API and thus could break without warning.
    return (
      key.indexOf('COMPONENT_CELL') > -1 || // Pre Glimmer 2
      key.indexOf('COMPONENT DEFINITION') === 0 || // Glimmer 2
      // Added for: Ember CLI 3.2.0 after upgrade from Ember CLI 2.12.3
      key.indexOf('CURRIED COMPONENT DEFINITION') === 0
    )
  })

  if (!valid && logErrors) {
    logger.warn(
      ctx,
      `Expected property ${name} to be an Ember.Component but instead got: ${typeOf(value)}`,
      throwErrors
    )
  }

  return valid
}
