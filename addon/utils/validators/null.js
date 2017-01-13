/**
 * The PropTypes.null validator
 */

import logger from '../logger'

export default function (ctx, name, value, def, logErrors, throwErrors) {
  const valid = value === null

  if (!valid && logErrors) {
    logger.warn(ctx, `Expected property ${name} to be null`, throwErrors)
  }

  return valid
}
