/**
 * The PropTypes.shape validator
 */

import {get} from '@ember/object'
import {typeOf} from '@ember/utils'

import logger from '../logger'

/* eslint-disable complexity */
export default function (validators, ctx, name, value, def, logErrors, throwErrors) {
  const typeDefs = def.typeDefs
  let msg = `Expected property ${name} to match given shape`
  let shape
  try {
    shape = JSON.stringify(value, null, ' ')
    msg = `${msg}, but instead got value ${shape}`
  } catch (e) {}

  if (typeOf(typeDefs) !== 'object') {
    logger.warn(ctx, 'PropTypes.shape() requires a plain object to be be passed in as an argument', throwErrors)
    return false
  }

  if (typeOf(value) !== 'object') {
    logger.warn(ctx, msg, throwErrors)
    return false
  }

  let valid = Object.keys(typeDefs).every((key) => {
    const typeDef = typeDefs[key]

    const objectValue = get(value, key)
    if (objectValue === undefined) {
      if (!typeDef.required) {
        return true
      } else {
        if (logErrors) {
          logger.warn(ctx, `Property ${name} is missing required property ${key}`, throwErrors)
        }
        return false
      }
    }

    return validators[typeDef.type](ctx, `${name}.${key}`, objectValue, typeDef, logErrors, throwErrors)
  })

  valid = valid && Object.keys(value).every((key) => {
    const keyIsKnown = (key in typeDefs)
    if (!keyIsKnown && logErrors) {
      logger.warn(ctx, `Property ${name} has an unknown key: ${key}`, throwErrors)
    }
    return keyIsKnown
  })

  if (!valid && logErrors) {
    logger.warn(ctx, msg, throwErrors)
  }

  return valid
}
/* eslint-enable complexity */
