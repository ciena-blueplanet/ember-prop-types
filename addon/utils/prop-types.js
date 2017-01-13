import Ember from 'ember'
const {isArray, typeOf} = Ember
import logger from './logger'
import validators from './validators'

const PropTypes = {}

export function getDef (def) {
  // Support handling non-function call propTypes
  // i.e. PropTypes.string.isRequired
  if (def && def.prototype) {
    return {
      isRequired: def.isRequired,
      required: def.required,
      type: def.type
    }
  }

  // Support handling function call propTypes
  // i.e. PropTypes.string({required: true})
  return def
}

export function generateType (key) {
  return {
    isRequired: {
      required: true,
      type: key
    },
    required: false,
    type: key
  }
}

;[
  'any',
  'array',
  'bool',
  'element',
  'EmberComponent',
  'EmberObject',
  'func',
  'null',
  'number',
  'object',
  'string',
  'symbol'
]
  .forEach((key) => {
    PropTypes[key] = function (options) {
      const def = {
        required: false,
        type: key
      }

      if (typeOf(options) !== 'object') {
        return def
      }

      if ('required' in options) {
        def.required = options.required
      }

      if (options.updatable === false) {
        def.updatable = false
      }

      return def
    }

    const obj = PropTypes[key]

    obj.isRequired = {
      required: true,
      type: key
    }

    obj.required = false
    obj.type = key
  })

PropTypes.arrayOf = function (typeDef, options) {
  const type = generateType('arrayOf')

  type.typeDef = getDef(typeDef)

  if (typeOf(options) !== 'object') {
    type.isRequired.typeDef = type.typeDef
    return type
  }

  delete type.isRequired

  if ('required' in options) {
    type.required = options.required
  }

  if (options.updatable === false) {
    type.updatable = false
  }

  return type
}

PropTypes.oneOfType = function (typeDefs, options) {
  const type = generateType('oneOfType')

  if (isArray(typeDefs)) {
    typeDefs = typeDefs.map((def) => {
      return getDef(def)
    })
  }

  type.typeDefs = typeDefs

  if (typeOf(options) !== 'object') {
    type.isRequired.typeDefs = type.typeDefs
    return type
  }

  delete type.isRequired

  if ('required' in options) {
    type.required = options.required
  }

  if (options.updatable === false) {
    type.updatable = false
  }

  return type
}

PropTypes.oneOf = function (valueOptions, options) {
  const type = generateType('oneOf')

  type.valueOptions = valueOptions

  if (typeOf(options) !== 'object') {
    type.isRequired.valueOptions = type.valueOptions
    return type
  }

  delete type.isRequired

  if ('required' in options) {
    type.required = options.required
  }

  if (options.updatable === false) {
    type.updatable = false
  }

  return type
}

PropTypes.instanceOf = function (typeDef, options) {
  const type = generateType('instanceOf')

  type.typeDef = typeDef

  if (typeOf(options) !== 'object') {
    type.isRequired.typeDef = type.typeDef
    return type
  }

  delete type.isRequired

  if ('required' in options) {
    type.required = options.required
  }

  if (options.updatable === false) {
    type.updatable = false
  }

  return type
}

PropTypes.shape = function (typeDefs, options) {
  const type = generateType('shape')

  if (typeOf(typeDefs) === 'object') {
    Object.keys(typeDefs)
      .forEach((key) => {
        typeDefs[key] = getDef(typeDefs[key])
      })
  }

  type.typeDefs = typeDefs

  if (typeOf(options) !== 'object') {
    type.isRequired.typeDefs = type.typeDefs
    return type
  }

  delete type.isRequired

  if ('required' in options) {
    type.required = options.required
  }

  if (options.updatable === false) {
    type.updatable = false
  }

  return type
}

export default PropTypes
export {validators}
export {logger}
