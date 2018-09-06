/**
 * The PropTypes.oneOf validator
 */

import {typeOf} from '@ember/utils'

import logger from '../logger'

export default function (ctx, name, value, def, logErrors, throwErrors) {
  const valueOptions = def.valueOptions

  if (typeOf(valueOptions) !== 'array') {
    logger.warn(ctx, 'PropTypes.oneOf() requires an array of values to be passed in as an argument', throwErrors)
    return false
  }

  const valid = valueOptions.some((option) => option === value)

  if (!valid && logErrors) {
    logger.warn(ctx, `Property ${name} is not one of: ${valueOptions.join(', ')}`, throwErrors)
  }

  return valid
}
