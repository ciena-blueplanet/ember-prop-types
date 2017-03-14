import {expect} from 'chai'
import Ember from 'ember'
import {beforeEach, it} from 'mocha'

const {
  isEmpty,
  typeOf
} = Ember

/**
 * Create error messages for each failure reason
 *
 * @param {Array} different propTypes that are specified but not correctly
 * @param {Array} missing propTypes that are expected but are missing
 * @param {Array} unexpected propTypes that are not expected
 * @returns {Array} failure reasons
 */
function createMessages (different, missing, unexpected) {
  const messages = []

  if (!isEmpty(different)) {
    messages.push(
      `The following propTypes are different than expected: ${different.join(', ')}`
    )
  }

  if (!isEmpty(missing)) {
    messages.push(
      `The following propTypes were not found but are expected: ${missing.join(', ')}`
    )
  }

  if (!isEmpty(unexpected)) {
    messages.push(
      `The following propTypes were found but not expected: ${unexpected.join(', ')}`
    )
  }

  return messages
}

/**
 * Find propTypes that are specified but not correctly
 *
 * @param {Object} definedPropTypes defined PropTypes definitions
 * @param {Object} expectedPropTypes expected PropTypes definitions
 * @returns {Array} propTypes that are specified but not correctly
 */
function findDifferentProperties (definedPropTypes, expectedPropTypes) {
  const properties = []

  for (let key in expectedPropTypes) {
    if ((key in definedPropTypes) && JSON.stringify(definedPropTypes[key]) !== JSON.stringify(expectedPropTypes[key])) {
      properties.push(key)
    }
  }

  return properties
}

/**
 * Find propTypes that are expected but are missing
 *
 * @param {Object} definedPropTypes defined PropTypes definitions
 * @param {Object} expectedPropTypes expected PropTypes definitions
 * @returns {Array} propTypes that are expected but are missing
 */
function findMissingProperties (definedPropTypes, expectedPropTypes) {
  const properties = []

  for (let key in expectedPropTypes) {
    if (!(key in definedPropTypes)) {
      properties.push(key)
    }
  }

  return properties
}

/**
 * Find propTypes that are not expected
 *
 * @param {Object} definedPropTypes defined PropTypes definitions
 * @param {Object} expectedPropTypes expected PropTypes definitions
 * @returns {Array} propTypes that are not expected
 */
function findUnexpectedProperties (definedPropTypes, expectedPropTypes) {
  const properties = []

  for (let key in definedPropTypes) {
    if (!(key in expectedPropTypes)) {
      properties.push(key)
    }
  }

  return properties
}

/**
 * Create an instance of provided class or pass through if already an instance
 *
 * @param {Class|Object} source Component class or instance
 * @returns {Object} Instaniated class
 */
function getInstance (source) {
  return (typeOf(source) === 'class') ? source.create() : source
}

/**
 * Find propTypes that are expected but are missing
 *
 * @param {Class|Object} source Component class or instance
 * @param {Object} expectedPropTypes expected PropTypes definitions
 */
export default function validatePropTypes (source, expectedPropTypes) {
  const instance = getInstance(source)
  let messages

  beforeEach(function () {
    let definedPropTypes = instance.get('propTypes')
    definedPropTypes = definedPropTypes[definedPropTypes.length - 1]

    const different = findDifferentProperties(definedPropTypes, expectedPropTypes)
    const missing = findMissingProperties(definedPropTypes, expectedPropTypes)
    const unexpected = findUnexpectedProperties(definedPropTypes, expectedPropTypes)

    messages = createMessages(different, missing, unexpected)
  })

  it('should have correct PropType validations', function () {
    // Have to use `expect()` off of `forTestingOnly` in order to have a reference
    // to the correct context for the associated unit test of this helper
    forTestingOnly.expect(messages).to.have.length(0, messages.join('\n'))
  })
}

/**
 * These functions do not need to be exported for use by consumer code as they have no external use.
 * They are exported though so that they can be tested.
 * They are namespaced as such to indicate this deliniation and dissuade their use by consumer code
 *
 * @type {Object}
 */
const forTestingOnly = {
  createMessages,
  expect,
  findDifferentProperties,
  findMissingProperties,
  findUnexpectedProperties,
  getInstance
}

export {forTestingOnly}
