/**
 * The PropTypes.oneOfType validator
 */

import {typeOf} from '@ember/utils'

import logger from '../logger'

export default function (validators, ctx, name, value, def, logErrors, throwErrors) {
  let valid = false

  if (typeOf(def.typeDefs) !== 'array') {
    logger.warn(ctx, 'PropTypes.oneOfType() requires an array of types to be passed in as an argument', throwErrors)

    return valid
  }

  for (let i = 0, len = def.typeDefs.length; i < len; i++) {
    const typeDef = def.typeDefs[i]

    if (validators[typeDef.type](ctx, name, value, typeDef, false)) {
      valid = true
      break
    }
  }

  if (!valid) {
    const types = def.typeDefs.map((typeDef) => typeDef.type)
    logger.warn(
      ctx,
      `Expected property ${name} to be one of expected types: [${types.join(', ')}] but instead got ${typeOf(value)}`,
      throwErrors
    )
  }

  return valid
}
