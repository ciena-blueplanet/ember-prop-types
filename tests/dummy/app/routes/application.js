import Ember from 'ember'
const {Route} = Ember

import contributors from '../fixtures/contributors'
import validators from '../fixtures/validators'

const defaultsExample = `
import Ember from 'ember'
const {Component} = Ember
import PropTypeMixin, {PropTypes} from 'ember-prop-types'

export default Component.extend(PropTypeMixin, {
  propTypes: {
    baz: PropTypes.number,
    foo: PropTypes.string
  },

  getDefaultProps () {
    return {
      baz: 1,
      foo: 'bar'
    }
  }
})

`

const config = `
'ember-prop-types': {
  // Validate properties coming from a spread property (default is undefined)
  spreadProperty: 'options',

  // Throw errors instead of logging warnings (default is false)
  throwErrors: true,

  // Validate properties (default is true for all environments except "production")
  validate: true,

  // Validate properties when they are updated (default is false)
  validateOnUpdate: true
}
`

export default Route.extend({
  model () {
    return {
      config,
      contributors,
      defaultsExample,
      validators
    }
  }
})
