/**
 * The PropTypes.func validator
 */

import Ember from 'ember'
const {typeOf} = Ember

import logger from '../logger'

export default function (ctx, name, value, def, logErrors, throwErrors) {
  const valid = typeOf(value) === 'function'

  if (!valid && logErrors) {
    logger.warn(ctx, `Expected property ${name} to be a function`, throwErrors)
  }

  return valid
}
