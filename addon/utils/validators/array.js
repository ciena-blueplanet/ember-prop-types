/**
 * The PropTypes.array validator
 */
import {typeOf} from '@ember/utils'

import logger from '../logger'

export default function (ctx, name, value, def, logErrors, throwErrors) {
  const valid = typeOf(value) === 'array'

  if (!valid && logErrors) {
    logger.warn(ctx, `Expected property ${name} to be an array but instead got: ${typeOf(value)}`, throwErrors)
  }

  return valid
}
