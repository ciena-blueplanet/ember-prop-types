/**
 * The PropTypes.iface validator
 */

import Ember from 'ember'
const {get, typeOf} = Ember

import logger from '../logger'

/* eslint-disable complexity */
export default function (validators, ctx, name, value, def, logErrors, throwErrors) {
  const typeDefs = def.typeDefs
  let msg = `Expected property ${name} to match given interface`
  let iface
  try {
    iface = JSON.stringify(value, null, ' ')
    msg = `${msg}, but instead got value ${iface}`
  } catch (e) {}

  if (typeOf(typeDefs) !== 'object') {
    logger.warn(ctx, 'PropTypes.iface() requires a plain object to be be passed in as an argument', throwErrors)
    return false
  }

  // allow POJOs as well as Ember Object instances for greater flexibility
  if (typeOf(value) !== 'object' && typeOf(value) !== 'instance') {
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

  if (!valid && logErrors) {
    logger.warn(ctx, msg, throwErrors)
  }

  return valid
}
