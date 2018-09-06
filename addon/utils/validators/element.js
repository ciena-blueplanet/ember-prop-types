/**
 * The PropTypes.element validator
 */

/* global Element */
import {typeOf} from '@ember/utils'
import logger from '../logger'

export default function (ctx, name, value, def, logErrors, throwErrors) {
  const valid = value instanceof Element

  if (!valid && logErrors) {
    logger.warn(ctx, `Expected property ${name} to be an element but instead got: ${typeOf(value)}`, throwErrors)
  }

  return valid
}
