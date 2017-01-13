/**
 * The PropTypes.symbol validator
 */

import logger from '../logger'

export default function (ctx, name, value, def, logErrors, throwErrors) {
  const valid = typeof value === 'symbol'

  if (!valid && logErrors) {
    logger.warn(ctx, `Expected property ${name} to be a symbol`, throwErrors)
  }

  return valid
}
