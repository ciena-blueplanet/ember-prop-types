/**
 * The PropTypes.string validator
 */

import Ember from 'ember'
const {typeOf} = Ember

import logger from '../logger'

export default function (ctx, name, value, def, logErrors, throwErrors) {
  const valid = typeOf(value) === 'string'

  if (!valid && logErrors) {
    logger.warn(ctx, `Expected property ${name} to be a string`, throwErrors)
  }

  return valid
}
