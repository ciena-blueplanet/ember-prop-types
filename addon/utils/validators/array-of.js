/**
 * The PropTypes.arrayOf validator
 */
import {typeOf} from '@ember/utils'

import logger from '../logger'
const {isArray} = Array

export default function (validators, ctx, name, value, def, logErrors, throwErrors) {
  const typeDef = def.typeDef

  const valid = isArray(value) && value.every((item, index) => {
    return validators[typeDef.type](ctx, `${name}[${index}]`, item, typeDef, logErrors, throwErrors)
  })

  if (!valid && logErrors) {
    logger.warn(
      ctx,
      `Expected property ${name} to be an array of type ${typeDef.type} but instead got: ${typeOf(value)}`,
      throwErrors
    )
  }

  return valid
}
