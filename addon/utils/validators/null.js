/**
 * The PropTypes.null validator
 */
import {typeOf} from '@ember/utils'
import logger from '../logger'

export default function (ctx, name, value, def, logErrors, throwErrors) {
  const valid = value === null

  if (!valid && logErrors) {
    logger.warn(ctx, `Expected property ${name} to be null but instead got: ${typeOf(value)}`, throwErrors)
  }

  return valid
}
