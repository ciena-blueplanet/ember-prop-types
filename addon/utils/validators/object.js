/**
 * The PropTypes.object validator
 */

import Ember from 'ember'
const {typeOf} = Ember

import logger from '../logger'

export default function (ctx, name, value, def, logErrors, throwErrors) {
  const valid = typeOf(value) === 'object'

  if (!valid && logErrors) {
    logger.warn(ctx, `Expected property ${name} to be an object`, throwErrors)
  }

  return valid
}
