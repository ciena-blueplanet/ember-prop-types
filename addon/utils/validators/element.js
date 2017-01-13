/**
 * The PropTypes.element validator
 */

/* global Element */

import logger from '../logger'

export default function (ctx, name, value, def, logErrors, throwErrors) {
  const valid = value instanceof Element

  if (!valid && logErrors) {
    logger.warn(ctx, `Expected property ${name} to be an element`, throwErrors)
  }

  return valid
}
