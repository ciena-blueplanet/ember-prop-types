/**
 * The PropTypes.instanceOf validator
 */
import {typeOf} from '@ember/utils'
import logger from '../logger'

export default function (ctx, name, value, def, logErrors, throwErrors) {
  const type = def.typeDef
  const valid = value instanceof type

  if (!valid && logErrors) {
    const typeString = type.toString()
    const nameOfTypeMatch = typeString.match(/function (\w*)/)
    const nameOfType = nameOfTypeMatch ? nameOfTypeMatch[1] : typeString
    logger.warn(
      ctx,
      `Expected property ${name} to be an instance of ${nameOfType} but instead got: ${typeOf(value)}`,
      throwErrors
    )
  }

  return valid
}
